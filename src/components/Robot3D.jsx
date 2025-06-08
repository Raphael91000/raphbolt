import React, { Suspense, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Réglages zone visage & animation
const FACE_Y_TOP = 0.25;
const FACE_Y_BOTTOM = -0.25;
const SCAN_Y_START = 0.7;
const SCAN_Y_END = -0.7;

function getScanY(progress) {
  return SCAN_Y_START + (SCAN_Y_END - SCAN_Y_START) * progress;
}

function ScanBar({ progress }) {
  const scanY = getScanY(progress);
  const isOnFace = scanY < FACE_Y_TOP && scanY > FACE_Y_BOTTOM;
  const width = isOnFace ? 1.25 : 0.5;
  const opacity = isOnFace ? 0.97 : 0.68;
  const color = isOnFace ? "#00fff7" : "#00d6ff";

  return (
    <>
      {/* Bande lumineuse IA */}
      <mesh position={[0, scanY, 1.1]}>
        <planeGeometry args={[width, 0.14]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          emissive={color}
        />
      </mesh>
      {/* Halo d'intensité */}
      {isOnFace && (
        <mesh position={[0, scanY, 1.13]}>
          <planeGeometry args={[2.0, 0.33]} />
          <meshBasicMaterial
            color="#e6fff7"
            transparent
            opacity={0.18}
            emissive="#b6fff8"
          />
        </mesh>
      )}
    </>
  );
}

function RobotModel({ scanProgress = 0 }) {
  const group = useRef(null);
  const wireframeGroup = useRef();
  const { scene } = useGLTF("/base_basic_shaded.glb");

  const scanY = getScanY(scanProgress);
  const isScanOnFace = scanY < FACE_Y_TOP && scanY > FACE_Y_BOTTOM;

  // Wireframe overlay uniquement quand scan sur le visage
  useLayoutEffect(() => {
    if (!wireframeGroup.current) return;
    while (wireframeGroup.current.children.length > 0) {
      wireframeGroup.current.remove(wireframeGroup.current.children[0]);
    }
    if (isScanOnFace) {
      scene.traverse((child) => {
        if (child.isMesh && child.geometry) {
          const wireMat = new THREE.MeshBasicMaterial({
            color: "#18ffe6",
            wireframe: true,
            opacity: 0.78,
            transparent: true,
          });
          const wireMesh = new THREE.Mesh(child.geometry, wireMat);
          wireMesh.position.copy(child.position);
          wireMesh.rotation.copy(child.rotation);
          wireMesh.scale.copy(child.scale);
          wireframeGroup.current.add(wireMesh);
        }
      });
    }
  }, [scene, isScanOnFace]);

  useLayoutEffect(() => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(scanProgress * Math.PI) * 0.12;
    group.current.rotation.x = Math.sin(scanProgress * 2 * Math.PI) * 0.06;
  }, [scanProgress]);

  return (
    <group ref={group} position={[0, -0.75, 0]} scale={0.92}>
      <primitive object={scene} />
      <group ref={wireframeGroup} />
    </group>
  );
}

export default function Robot3D({ scanProgress = 0 }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.1, 4.5], fov: 25 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 5, 5]} intensity={1.1} />
        <Suspense fallback={null}>
          <RobotModel scanProgress={scanProgress} />
          <ScanBar progress={scanProgress} />
        </Suspense>
        {/* === OrbitControls pour manipulation souris === */}
        <OrbitControls
          enableZoom={false} // ou true si tu veux autoriser le zoom
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
          dampingFactor={0.13}
        />
      </Canvas>
    </div>
  );
}
