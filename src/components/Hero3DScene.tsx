import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Cosmic UFO / Anomaly Portal Core
const ParanormalSaucer = ({ mousePos }: { mousePos: { x: number; y: number } }) => {
  const saucerGroup = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Custom vertex shader or animated procedural rotation
  useFrame((state, delta) => {
    if (saucerGroup.current) {
      // Smooth tilt responding to normalized mouse position
      saucerGroup.current.rotation.y += delta * 0.4;
      saucerGroup.current.rotation.x = THREE.MathUtils.lerp(
        saucerGroup.current.rotation.x,
        mousePos.y * 0.4 + 0.2,
        0.05
      );
      saucerGroup.current.rotation.z = THREE.MathUtils.lerp(
        saucerGroup.current.rotation.z,
        -mousePos.x * 0.4,
        0.05
      );
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 1.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.8;
      ring2Ref.current.rotation.x += delta * 0.5;
    }

    if (coreRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.15 + 1;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={saucerGroup}>
      {/* Central Gravitational Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Primary Saucer Hull / Hull Disc */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[2.2, 0.4, 0.35, 36]} />
        <meshStandardMaterial
          color="#15151c"
          roughness={0.2}
          metalness={0.95}
          wireframe={false}
        />
      </mesh>

      {/* Upper Cockpit Dome */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[1.0, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshPhysicalMaterial
          color="#FF2E93"
          transmission={0.6}
          opacity={0.85}
          transparent
          roughness={0.1}
          ior={1.5}
        />
      </mesh>

      {/* Outer Energy Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.7, 0.06, 16, 64]} />
        <meshStandardMaterial
          color="#EFFF00"
          emissive="#EFFF00"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* Orbiting Quantum Glyph Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.04, 16, 48]} />
        <meshStandardMaterial
          color="#FF2E93"
          emissive="#FF2E93"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>

      {/* Glowing Vent Beacons Underneath */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.8;
        const z = Math.sin(angle) * 1.8;
        return (
          <mesh key={i} position={[x, -0.15, z]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial
              color="#00E5FF"
              emissive="#00E5FF"
              emissiveIntensity={4}
            />
          </mesh>
        );
      })}

      {/* Point Lights */}
      <pointLight color="#00E5FF" intensity={5} distance={10} position={[0, 0, 0]} />
      <pointLight color="#FF2E93" intensity={4} distance={8} position={[0, 2, 0]} />
      <pointLight color="#EFFF00" intensity={3} distance={6} position={[0, -2, 0]} />
    </group>
  );
};

// Swirling Interdimensional Particle Accretion Field
const SwirlingParticles = ({ count = 1200 }: { count?: number }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00E5FF');
    const pink = new THREE.Color('#FF2E93');
    const yellow = new THREE.Color('#EFFF00');

    for (let i = 0; i < count; i++) {
      // Cylindrical vortex distribution
      const radius = 1.5 + Math.random() * 8.0;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 5.0;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const mixedColor = Math.random() > 0.5 ? (Math.random() > 0.5 ? cyan : pink) : yellow;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.25;
      particlesRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

interface Hero3DSceneProps {
  mousePos: { x: number; y: number };
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ mousePos }) => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.2, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#F5F5F5" />
        <directionalLight position={[-5, -4, -5]} intensity={1.0} color="#FF2E93" />

        <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <ParanormalSaucer mousePos={mousePos} />
        </Float>

        <SwirlingParticles count={1500} />
      </Canvas>
    </div>
  );
};
