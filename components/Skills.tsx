import * as React from "react";
import { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars, Text } from "@react-three/drei";
import { MapPin } from "lucide-react";
import type { PortfolioConfig } from "../portfolio-types";

/**
 * Renders a single skill node in the Three.js scene
 */
function SkillNode({
  label,
  short,
  color,
  position,
}: {
  label: string;
  short: string;
  color: string;
  position: [number, number, number];
}) {
  const group = React.useRef<any>(null);
  useFrame(({ clock }: { clock: any }) => {
    if (group.current)
      group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.2 + position[0]) * 0.045;
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
        <div style={{ color }}><b>{short}</b><span>{label}</span></div>
      </Html>
    </group>
  );
}

/**
 * Ranges an orbit ring in the Three.js scene
 */
function OrbitRing({
  radius,
  rotation,
  color,
}: {
  radius: number;
  rotation: [number, number, number];
  color: string;
}) {
  const ring = React.useRef<any>(null);
  useFrame((_, delta: number) => {
    if (ring.current) ring.current.rotation.z += delta * 0.08;
  });
  return (
    <mesh ref={ring} rotation={rotation}>
      <torusGeometry args={[radius, 0.006, 8, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.32} />
    </mesh>
  );
}

/**
 * Three.js skills scene component
 */
function SkillsScene({ nodes }: { nodes: any[] }) {
  function Core() {
    const core = React.useRef<any>(null);
    useFrame((_, delta: number) => {
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

  function SceneContent() {
    const system = React.useRef<any>(null);
    useFrame((_, delta: number) => {
      if (system.current) system.current.rotation.y += delta * 0.07;
    });
    return (
      <group ref={system}>
        <Core />
        <OrbitRing radius={1.45} rotation={[0.25, 0.1, 0.1]} color="#a98eff" />
        <OrbitRing radius={1.95} rotation={[1.25, 0.1, -0.4]} color="#64d9ff" />
        <OrbitRing radius={2.35} rotation={[0.2, 0.8, 1.2]} color="#a98eff" />
        {nodes.map((node: any) => <SkillNode {...node} key={node.label} />)}
      </group>
    );
  }

  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 36 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.35} />
      <Stars radius={8} depth={4} count={90} factor={1.4} saturation={0} fade speed={0.35} />
      <SceneContent />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} minPolarAngle={Math.PI / 2.4} maxPolarAngle={Math.PI / 1.8} rotateSpeed={0.42} />
    </Canvas>
  );
}

/**
 * Renders skill chips by category
 */
function SkillChips({ groups }: { groups: { intelligence: string[]; interfaces: string[]; infrastructure: string[] } }) {
  // Use type assertion to satisfy the index signature check
  const intelliGroups = groups as any;
  return (
    <div className="skill-chips" aria-label="Technical skills">
      <p className="skill-list-intro">A stack designed for the distance between an idea and a shipped product.</p>
      <div className="skill-groups">
        {[ "intelligence", "interfaces", "infrastructure" ].map(
          (category) => (
            <div key={category}>
              <span className="group-number">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <p>
                {intelliGroups[category]?.slice(0, 4).join("/ ") || ""}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/**
 * Main Skills component - reads from portfolio-config.json
 */
export function Skills({ config }: { config: PortfolioConfig }) {
  const [skillsData, setSkillsData] = useState(() => {
    return {
      intelligence:
        config.skills?.intelligence ||
        ["TensorFlow", "Google Gemini API", "RAG Pipelines", "IBM Docling", "Vector Search", "LLM Integration", "Prompt Engineering"],
      interfaces:
        config.skills?.interfaces || ["React", "Next.js", "TypeScript", "Three.js"],
      infrastructure:
        config.skills?.infrastructure || ["FastAPI", "Node.js", "PostgreSQL", "MongoDB", "Docker"],
    };
  });

  useEffect(() => {
    setSkillsData((prev) => ({
      ...prev,
      intelligence: config.skills?.intelligence || prev.intelligence,
      interfaces: config.skills?.interfaces || prev.interfaces,
      infrastructure: config.skills?.infrastructure || prev.infrastructure,
    }));
  }, [config]);

  const nodes = skillsData.interfaces.map(
    (label: string, i: number) => ({
      label,
      short: label.charAt(0),
      color:
        i < 2
          ? "#62d9ff"
          : i === 2
            ? "#b391ff"
            : "#6ee7b7",
      position: [
        i === 0 ? -2.05 : i === 1 ? 1.95 : i === 2 ? 0.3 : -1.8,
        i === 0 ? 1.2 : i === 1 ? 1.45 : i === 2 ? 0.15 : -1.25,
        i === 0 ? 0.3 : i === 1 ? -0.5 : i === 2 ? 0.25 : 0.15,
      ],
    })
  );

  return (
    <section className="skills section-wrap" id="skills">
      <div className="skills-heading">
        <div>
          <p className="section-label">The working toolkit</p>
          <h2>Systems I speak <em>fluently.</em></h2>
        </div>
        <p className="skills-instruction">
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Drag to orbit · auto-rotating
        </p>
      </div>
      <div className="skills-layout">
        <div className="skills-scene-wrap">
          <SkillsScene nodes={nodes} />
        </div>
        <div className="skill-list">
          <SkillChips groups={skillsData} />
        </div>
      </div>
    </section>
  );
}