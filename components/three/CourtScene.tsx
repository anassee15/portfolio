"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { createCourtFloor } from "./court-floor";
import { createInkUniforms, createOutlineMaterial, createToneMaterial, updateInk } from "./ink-material";
import {
  HOOP_Z,
  PLAY_DURATION,
  Phase,
  ROUTER,
  SYNTHESIS,
  WINGS,
  activePlayers,
  ballsAt,
  phaseAt,
  type Play,
  type Vec3,
} from "./play";

export type InkColors = { paper: string; ink: string; ball: string };

type CourtSceneProps = {
  colors: InkColors;
  play: Play;
  /** Changing this number re-samples the scene from noise. */
  sample: number;
  active: boolean;
  maxDpr: number;
  onPhase: (phase: Phase) => void;
  onPlayEnd: () => void;
  /** Called once the shaders are compiled and the first frame is about to be drawn. */
  onReady: () => void;
};

const DENOISE_SECONDS = 1.7;
const MAX_AGENTS = WINGS.length;
const LABEL_HEIGHT = 1.6;

type Player = { id: "router" | "synthesis" | number; position: Vec3; scale: number };

const PLAYERS: Player[] = [
  { id: "router", position: ROUTER, scale: 1.05 },
  ...WINGS.map((position, i) => ({ id: i, position, scale: 1 })),
  { id: "synthesis", position: SYNTHESIS, scale: 1.12 },
];

function useCourtAssets() {
  return useMemo(() => {
    const uniforms = createInkUniforms();
    const paper = { value: new THREE.Color() };
    const ball = { value: new THREE.Color() };
    const floor = createCourtFloor();

    const materials = {
      floor: createToneMaterial(uniforms, { color: paper, bias: -0.1, map: floor.texture }),
      board: createToneMaterial(uniforms, { color: paper, bias: 0.05 }),
      post: createToneMaterial(uniforms, { color: paper, bias: 0.15 }),
      body: createToneMaterial(uniforms, { color: paper, bias: 0.08 }),
      head: createToneMaterial(uniforms, { color: paper }),
      shadow: createToneMaterial(uniforms, { color: paper, bias: 0.42 }),
      ball: createToneMaterial(uniforms, { color: ball }),
      rim: createToneMaterial(uniforms, { color: ball, bias: 0.1 }),
      marker: createToneMaterial(uniforms, { color: ball, bias: -0.3 }),
      outline: createOutlineMaterial(uniforms),
    };

    const geometries = {
      floor: new THREE.PlaneGeometry(14, 10),
      board: new THREE.BoxGeometry(1.8, 1.05, 0.06),
      post: new THREE.CylinderGeometry(0.06, 0.06, 3, 12),
      rim: new THREE.TorusGeometry(0.24, 0.03, 8, 24),
      body: new THREE.CapsuleGeometry(0.22, 0.46, 6, 16),
      head: new THREE.SphereGeometry(0.17, 20, 14),
      shadow: new THREE.CircleGeometry(0.36, 24),
      marker: new THREE.RingGeometry(0.42, 0.5, 32),
      ball: new THREE.SphereGeometry(0.13, 18, 12),
    };

    return { uniforms, colors: { paper, ball }, floor, materials, geometries };
  }, []);
}

type Assets = ReturnType<typeof useCourtAssets>;
type LabelRefs = React.RefObject<(HTMLSpanElement | null)[]>;

function PlayerMesh({ assets, player, groupRef }: { assets: Assets; player: Player; groupRef: (g: THREE.Group | null) => void }) {
  const { geometries: g, materials: m } = assets;
  return (
    <group position={player.position} scale={player.scale}>
      <mesh geometry={g.shadow} material={m.shadow} rotation-x={-Math.PI / 2} position-y={0.01} />
      {/* The body bobs a little; the shadow stays on the floor. */}
      <group ref={groupRef}>
        <mesh geometry={g.body} material={m.body} position-y={0.58}>
          <mesh geometry={g.body} material={m.outline} />
        </mesh>
        <mesh geometry={g.head} material={m.head} position-y={1.2}>
          <mesh geometry={g.head} material={m.outline} />
        </mesh>
      </group>
    </group>
  );
}

function Court({ colors, play, sample, labels, pointer, onPhase, onPlayEnd }: Omit<CourtSceneProps, "active" | "maxDpr" | "onReady"> & {
  labels: LabelRefs;
  pointer: React.RefObject<{ x: number; y: number }>;
}) {
  const assets = useCourtAssets();
  const { uniforms, floor, geometries: g, materials: m } = assets;
  const balls = useRef<(THREE.Mesh | null)[]>([]);
  const markers = useRef<(THREE.Mesh | null)[]>([]);
  const bodies = useRef<(THREE.Group | null)[]>([]);
  const noiseStart = useRef(-1);
  const playStart = useRef(-1);
  const lastPhase = useRef<Phase | null>(null);
  const camera = useRef({ x: 0, y: 7.2 });
  const projected = useMemo(() => new THREE.Vector3(), []);
  const agents = Math.min(play.agents.length, MAX_AGENTS);

  useEffect(() => {
    // The shaders output these values untouched, so store the hex codes as-is (no sRGB decoding).
    const raw = THREE.LinearSRGBColorSpace;
    uniforms.uInk.value.setStyle(colors.ink, raw);
    assets.colors.paper.value.setStyle(colors.paper, raw);
    assets.colors.ball.value.setStyle(colors.ball, raw);
  }, [assets, uniforms, colors]);

  useEffect(() => {
    noiseStart.current = -1;
  }, [sample]);

  useEffect(() => {
    playStart.current = -1;
    lastPhase.current = null;
  }, [play]);

  useFrame((state) => {
    const now = state.clock.elapsedTime;
    if (noiseStart.current < 0) noiseStart.current = now;
    if (playStart.current < 0) playStart.current = now;

    // Denoise: the dots go from random to shaded over DENOISE_SECONDS.
    const progress = Math.min(1, (now - noiseStart.current) / DENOISE_SECONDS);
    updateInk(uniforms, { noise: Math.pow(1 - progress, 3), time: now, dpr: state.viewport.dpr });

    const t = now - playStart.current;
    if (t >= PLAY_DURATION) {
      playStart.current = now;
      onPlayEnd();
      return;
    }

    const phase = phaseAt(t);
    if (phase !== lastPhase.current) {
      lastPhase.current = phase;
      floor.drawPlay(agents, phase);
      onPhase(phase);
    }

    const positions = ballsAt(t, agents);
    balls.current.forEach((ball, i) => {
      if (!ball) return;
      ball.visible = i < positions.length;
      if (ball.visible) ball.position.set(...positions[i]);
    });

    // Orange rings under the players who have, or are about to get, the ball.
    const onBall = activePlayers(phase, agents).map((id) => PLAYERS.find((p) => p.id === id)!.position);
    markers.current.forEach((marker, i) => {
      if (!marker) return;
      marker.visible = i < onBall.length;
      if (marker.visible) marker.position.set(onBall[i][0], 0.02, onBall[i][2]);
    });

    // Players breathe; the camera drifts a little towards the pointer.
    bodies.current.forEach((body, i) => body?.position.setY(Math.sin(now * 2.2 + i * 1.7) * 0.03));
    const cam = camera.current;
    cam.x += (pointer.current.x * 3.2 - cam.x) * 0.06;
    cam.y += (7.2 - pointer.current.y * 2 - cam.y) * 0.06;
    state.camera.position.set(cam.x + 1.2, cam.y, 10.6);
    state.camera.lookAt(0, 1, -1.4);

    // Name tags follow the players on screen, once the noise has settled.
    const { width, height } = state.size;
    PLAYERS.forEach((player, i) => {
      const label = labels.current[i];
      if (!label) return;
      projected.set(player.position[0], LABEL_HEIGHT * player.scale, player.position[2]).project(state.camera);
      label.style.transform = `translate(-50%, -100%) translate(${((projected.x + 1) / 2) * width}px, ${((1 - projected.y) / 2) * height}px)`;
      label.style.opacity = progress > 0.8 ? "1" : "0";
      label.dataset.active = String(activePlayers(phase, agents).includes(player.id));
    });
  });

  return (
    <>
      <color attach="background" args={[colors.paper]} />
      <mesh geometry={g.floor} material={m.floor} rotation-x={-Math.PI / 2} />

      <mesh geometry={g.board} material={m.board} position={[0, 3.05, HOOP_Z - 0.15]}>
        <mesh geometry={g.board} material={m.outline} />
      </mesh>
      <mesh geometry={g.post} material={m.post} position={[0, 1.5, HOOP_Z - 0.35]}>
        <mesh geometry={g.post} material={m.outline} />
      </mesh>
      <mesh geometry={g.rim} material={m.rim} rotation-x={Math.PI / 2} position={[0, 2.6, HOOP_Z + 0.2]} />

      {PLAYERS.map((player, i) => (
        <PlayerMesh
          key={String(player.id)}
          assets={assets}
          player={player}
          groupRef={(group) => {
            bodies.current[i] = group;
          }}
        />
      ))}

      {Array.from({ length: MAX_AGENTS }, (_, i) => (
        <mesh
          key={`marker-${i}`}
          ref={(mesh) => {
            markers.current[i] = mesh;
          }}
          geometry={g.marker}
          material={m.marker}
          rotation-x={-Math.PI / 2}
          visible={false}
        />
      ))}

      {Array.from({ length: MAX_AGENTS }, (_, i) => (
        <mesh
          key={`ball-${i}`}
          ref={(mesh) => {
            balls.current[i] = mesh;
          }}
          geometry={g.ball}
          material={m.ball}
          visible={false}
        >
          <mesh geometry={g.ball} material={m.outline} />
        </mesh>
      ))}
    </>
  );
}

/** Role shown above each player: router, the agents called for this question, synthesis. */
function labelFor(player: Player, play: Play) {
  if (player.id === "router") return "router";
  if (player.id === "synthesis") return "synthesis";
  return play.agents[player.id] ?? null;
}

/**
 * Compiles every shader in the background before the first frame, so the first
 * render doesn't block the main thread while the GPU links the programs.
 */
function WarmUp({ onReady }: { onReady: () => void }) {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    let cancelled = false;
    gl.compileAsync(scene, camera)
      .then(() => {
        if (!cancelled) onReady();
      })
      // If compiling fails (lost context), the still frame simply stays.
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera, onReady]);
  return null;
}

export default function CourtScene({ active, maxDpr, onReady, ...sceneProps }: CourtSceneProps) {
  const pointer = useRef({ x: 0, y: 0 });
  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  const [compiled, setCompiled] = useState(false);
  const handleReady = useCallback(() => {
    setCompiled(true);
    onReady();
  }, [onReady]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
    >
      <Canvas
        dpr={[1, maxDpr]}
        frameloop={active && compiled ? "always" : "never"}
        camera={{ fov: 30, near: 0.1, far: 100, position: [1.2, 7.2, 10.6] }}
        gl={{ antialias: true }}
        flat
        aria-hidden
      >
        <Court {...sceneProps} labels={labels} pointer={pointer} />
        <WarmUp onReady={handleReady} />
      </Canvas>

      {PLAYERS.map((player, i) => {
        const text = labelFor(player, sceneProps.play);
        if (!text) return null;
        return (
          <span
            key={String(player.id)}
            ref={(span) => {
              labels.current[i] = span;
            }}
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 bg-paper px-1 font-mono text-[10px] leading-tight whitespace-nowrap text-ink-2 opacity-0 transition-opacity duration-300 data-[active=true]:text-ball-text"
          >
            {text}
          </span>
        );
      })}
    </div>
  );
}
