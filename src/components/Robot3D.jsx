import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Astuce : Si tu veux changer de robot, change juste le chemin ici !
function RobotModel() {
  const { scene } = useGLTF("/base_basic_shaded.glb"); // ou "/base_basic_pbr.glb"
  return (
    <primitive
      object={scene}
      scale={1.1}
      position={[0, -1.1, 0]} // <-- Descend le robot (Y négatif)
    />
  );
}

export default function Robot3D() {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <Canvas camera={{ position: [0, 0.8, 5], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <RobotModel />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
