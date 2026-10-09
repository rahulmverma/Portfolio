"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const nodes = [
  { label: "React", short: "R", color: "#62d9ff", position: [-2.05, 1.2, 0.3] as [number, number, number] },
  { label: "Python", short: "Py", color: "#f5c452", position: [1.95, 1.45, -0.5] as [number, number, number] },
  { label: "Node", short: "✦", color: "#b391ff", position: [0.3, 0.15, 1.45] as [number, number, number] },
  { label: "FastAPI", short: "FA", color: "#6ee7b7", position: [-1.8, -1.25, 0.25] as [number, number, number] },
  { label: "Postgres", short: "PG", color: "#78a9ff", position: [1.8, -1.05, 0.15] as [number, number, number] },
  { label: "MongoDB", short: "", color: "#ff7c87", position: [0, 1.75, -1.15] as [number, number, number] },
];

function Core() {
  const core = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (core.current) {
      core.current.rotation.x += delta * 0.2;
      core.current.rotation.y += delta * 0.42;
    }
  });
  return (
    <group ref={core}>
      <mesh>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshBasicMaterial color="#bb9bff" wireframe transparent opacity={0.72} />
      </mesh>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial color="#ad8cff" transparent opacity={0.08} />
      </mesh>
      <pointLight color="#a981ff" intensity={2.5} distance={4} />
      <Text position={[0, -0.98, 0]} fontSize={0.13} color="#bba5eb" anchorX="center" letterSpacing={0.08}>AI CORE</Text>
    </group>
  );
}

function OrbitRing({ radius, rotation, color }: { radius: number; rotation: [number, number, number]; color: string }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.08;
  });
  return <mesh ref={ring} rotation={rotation}><torusGeometry args={[radius, 0.006, 8, 96]} /><meshBasicMaterial color={color} transparent opacity={0.32} /></mesh>;
}

function SkillNode({ label, short, color, position }: (typeof nodes)[number]) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.2 + position[0]) * 0.045;
  });
  return (
    <group ref={group} position={position}>
      <mesh>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshBasicMaterial color={color} transparent opacity={0.17} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.115, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight color={color} intensity={0.8} distance={1.5} />
      <Html center distanceFactor={8} position={[0, -0.42, 0]}>
        <div className="scene-node-label"><b style={{ color }}>{short}</b><span>{label}</span></div>
      </Html>
    </group>
  );
}

function SceneContent() {
  const system = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (system.current) system.current.rotation.y += delta * 0.07;
  });
  return (
    <group ref={system}>
      <Core />
      <OrbitRing radius={1.45} rotation={[0.25, 0.1, 0.1]} color="#a98eff" />
      <OrbitRing radius={1.95} rotation={[1.25, 0.1, -0.4]} color="#64d9ff" />
      <OrbitRing radius={2.35} rotation={[0.2, 0.8, 1.2]} color="#a98eff" />
      {nodes.map((node) => <SkillNode {...node} key={node.label} />)}
    </group>
  );
}

export default function SkillsScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 36 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.35} />
      <Stars radius={8} depth={4} count={90} factor={1.4} saturation={0} fade speed={0.35} />
      <SceneContent />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} minPolarAngle={Math.PI / 2.4} maxPolarAngle={Math.PI / 1.8} rotateSpeed={0.42} />
    </Canvas>
  );
}
