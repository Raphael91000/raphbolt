import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// === DEBUG : Afficher un axe central pour centrer le robot ===
function CenterLine() {
  return (
    <line>
      <bufferGeometry
        attach="geometry"
        setFromPoints={[
          new window.THREE.Vector3(0, -2, 0.6),
          new window.THREE.Vector3(0, 2, 0.6),
        ]}
      />
      <lineBasicMaterial color="magenta" linewidth={4} />
    </line>
  );
}

function RobotModel() {
  const group = useRef(null);
  const { scene } = useGLTF("/base_basic_shaded.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    // On remonte le robot et on réduit son scale
    <group ref={group} position={[0, -0.75, 0]} scale={0.95}>
      <primitive object={scene} />
      {/* <CenterLine /> // Décommente pour voir la ligne centrale */}
    </group>
  );
}

export default function Robot3D() {
  return (
    <div
      style={{
        width: "100vw",
        height: "56vh",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.2, 7.5], fov: 25 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.82} />
        <directionalLight position={[0, 5, 5]} intensity={1.1} />
        <Suspense fallback={null}>
          <RobotModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
