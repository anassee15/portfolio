"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { createCourtLinesTexture } from "./court-lines";
import { createInkUniforms, createOutlineMaterial, createToneMaterial, updateInk } from "./ink-material";
import { AGENTS, HOOP_Z, PLAY_DURATION, ROUTER, SYNTHESIS, ballsAt, pickAgents, type Vec3 } from "./play";

export type InkColors = { paper: string; ink: string; ball: string };

type SceneProps = {
  colors: InkColors;
  /** Changing this number re-samples the scene: noise again, new agents. */
  sample: number;
  pointer: React.RefObject<{ x: number; y: number }>;
};

const DENOISE_SECONDS = 1.7;
const MAX_BALLS = 3;

function useCourtAssets() {
  return useMemo(() => {
    const uniforms = createInkUniforms();
    const paper = { value: new THREE.Color() };
    const ball = { value: new THREE.Color() };

    const materials = {
      floor: createToneMaterial(uniforms, { color: paper, bias: -0.1, map: createCourtLinesTexture() }),
      board: createToneMaterial(uniforms, { color: paper, bias: 0.05 }),
      post: createToneMaterial(uniforms, { color: paper, bias: 0.15 }),
      body: createToneMaterial(uniforms, { color: paper, bias: 0.02 }),
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
      body: new THREE.CylinderGeometry(0.2, 0.26, 0.78, 20),
      head: new THREE.SphereGeometry(0.19, 20, 14),
      shadow: new THREE.CircleGeometry(0.36, 24),
      marker: new THREE.RingGeometry(0.42, 0.5, 32),
      ball: new THREE.SphereGeometry(0.13, 18, 12),
    };

    return { uniforms, colors: { paper, ball }, materials, geometries };
  }, []);
}

type Assets = ReturnType<typeof useCourtAssets>;

function Player({ assets, position, scale = 1 }: { assets: Assets; position: Vec3; scale?: number }) {
  const { geometries: g, materials: m } = assets;
  return (
    <group position={position} scale={scale}>
      <mesh geometry={g.body} material={m.body} position-y={0.42}>
        <mesh geometry={g.body} material={m.outline} />
      </mesh>
      <mesh geometry={g.head} material={m.head} position-y={1.03}>
        <mesh geometry={g.head} material={m.outline} />
      </mesh>
      <mesh geometry={g.shadow} material={m.shadow} rotation-x={-Math.PI / 2} position-y={0.01} />
    </group>
  );
}

function Court({ colors, sample, pointer }: SceneProps) {
  const assets = useCourtAssets();
  const { uniforms, geometries: g, materials: m } = assets;
  const balls = useRef<(THREE.Mesh | null)[]>([]);
  const timeline = useRef({ start: -1, picked: [1, 4], lastT: 0 });
  const camera = useRef({ x: 0, y: 7.2 });

  useEffect(() => {
    // The shaders output these values untouched, so store the hex codes as-is (no sRGB decoding).
    const raw = THREE.LinearSRGBColorSpace;
    uniforms.uInk.value.setStyle(colors.ink, raw);
    assets.colors.paper.value.setStyle(colors.paper, raw);
    assets.colors.ball.value.setStyle(colors.ball, raw);
  }, [assets, uniforms, colors]);

  useEffect(() => {
    timeline.current = { start: -1, picked: pickAgents(), lastT: 0 };
  }, [sample]);

  useFrame((state) => {
    const now = state.clock.elapsedTime;
    const tl = timeline.current;
    if (tl.start < 0) tl.start = now;

    // Denoise: the dots go from random to shaded over DENOISE_SECONDS.
    const progress = Math.min(1, (now - tl.start) / DENOISE_SECONDS);
    updateInk(uniforms, { noise: Math.pow(1 - progress, 3), time: now, dpr: state.viewport.dpr });

    // The play loops; every new loop the router picks other agents.
    const t = (now - tl.start) % PLAY_DURATION;
    if (t < tl.lastT) tl.picked = pickAgents();
    tl.lastT = t;
    const positions = ballsAt(t, tl.picked);
    balls.current.forEach((ball, i) => {
      if (!ball) return;
      ball.visible = i < positions.length;
      if (ball.visible) ball.position.set(...positions[i]);
    });

    // The camera drifts a little towards the pointer.
    const cam = camera.current;
    cam.x += (pointer.current.x * 3.2 - cam.x) * 0.06;
    cam.y += (7.2 - pointer.current.y * 2 - cam.y) * 0.06;
    state.camera.position.set(cam.x + 1.2, cam.y, 10.6);
    state.camera.lookAt(0, 1, -1.4);
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

      <Player assets={assets} position={ROUTER} scale={1.15} />
      <mesh geometry={g.marker} material={m.marker} rotation-x={-Math.PI / 2} position={[ROUTER[0], 0.02, ROUTER[2]]} />
      {AGENTS.map((position, i) => (
        <Player key={i} assets={assets} position={position} scale={0.95} />
      ))}
      <Player assets={assets} position={SYNTHESIS} />

      {Array.from({ length: MAX_BALLS }, (_, i) => (
        <mesh
          key={i}
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

type CourtSceneProps = Omit<SceneProps, "pointer"> & {
  active: boolean;
  maxDpr: number;
};

export default function CourtScene({ active, maxDpr, ...sceneProps }: CourtSceneProps) {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <div
      className="absolute inset-0"
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
        frameloop={active ? "always" : "never"}
        camera={{ fov: 30, near: 0.1, far: 100, position: [1.2, 7.2, 10.6] }}
        gl={{ antialias: true }}
        flat
        aria-hidden
      >
        <Court {...sceneProps} pointer={pointer} />
      </Canvas>
    </div>
  );
}
