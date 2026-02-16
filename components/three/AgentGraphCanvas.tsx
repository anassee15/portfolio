// components/three/AgentGraphCanvas.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

function AnimatedSphere({ position, color, size }: any) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
  });

  return (
    <Sphere ref={mesh} args={[size, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        distort={0.2}
        speed={2}
        roughness={0.4}
      />
    </Sphere>
  );
}

function AgentNodes() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.05;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.1;
  });

  const nodes = [
    { pos: [0, 0, 0], color: "#22d3ee", size: 0.5 },
    { pos: [2, 0.8, -0.5], color: "#a855f7", size: 0.3 },
    { pos: [-1.5, -0.6, 0.3], color: "#38bdf8", size: 0.35 },
    { pos: [0.5, 1.5, 1], color: "#f97316", size: 0.25 },
    { pos: [-1, -1.2, -0.8], color: "#22c55e", size: 0.28 },
    { pos: [1.8, -0.9, 0.6], color: "#ec4899", size: 0.22 },
  ];

  return (
    <group ref={group}>
      {nodes.map((node, idx) => (
        <AnimatedSphere
          key={idx}
          position={node.pos}
          color={node.color}
          size={node.size}
        />
      ))}

      {/* Connection lines with glow */}
      {[
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 3],
        [2, 4],
        [1, 5],
        [4, 5],
      ].map(([a, b], i) => {
        const from = new THREE.Vector3(...(nodes[a].pos as [number, number, number]));
        const to = new THREE.Vector3(...(nodes[b].pos as [number, number, number]));
        const mid = from.clone().lerp(to, 0.5);
        const dir = new THREE.Vector3().subVectors(to, from);
        const length = dir.length();
        const axis = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          axis,
          dir.clone().normalize()
        );

        return (
          <mesh key={`edge-${i}`} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[0.015, 0.015, length, 8]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={0.3}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function AgentGraphCanvas() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <color attach="background" args={[isDark ? "#020617" : "#f8fafc"]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#22d3ee" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
      <AgentNodes />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
