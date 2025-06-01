import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Tunnel({ scrollY }: { scrollY: number }) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Distance de base / zoom
  const baseZ = 15;
  const maxZ = -40;
  const scrollMax = 1; // 1 = 100% scroll (adapte si besoin)

  // Calcule la position en Z selon le scroll
  const z = baseZ + (maxZ - baseZ) * Math.min(scrollY, scrollMax);

  useFrame(() => {
    camera.position.z = z;
    // Ajoute une petite rotation progressive
    if (group.current) {
      group.current.rotation.z += 0.001;
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group}>
      {/* Tunnel */}
      <mesh>
        <cylinderGeometry args={[6, 6, 60, 64, 1, true]} />
        <meshBasicMaterial
          color="#22eaff"
          wireframe
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Points lumineux */}
      {[...Array(180)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const z = (i - 90) * 0.7;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 6,
              Math.sin(angle) * 6,
              z
            ]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#22eaff" />
          </mesh>
        );
      })}
    </group>
  );
}

export default function TunnelBackground() {
  // Récupère le scroll (entre 0 et 1)
  const [scroll, setScroll] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScroll(window.scrollY / maxScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <Tunnel scrollY={scroll} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={1.2} color="#22eaff" />
      </Canvas>
    </div>
  );
}
