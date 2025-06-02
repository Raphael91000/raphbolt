import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Chargement du cerveau
function BrainModel({ scroll }: { scroll: number }) {
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF("/human-brain.glb");

  // Rendu bleu du cerveau
  React.useEffect(() => {
    gltf.scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.material = new THREE.MeshStandardMaterial({
          color: "#1ca6fa",
          emissive: "#30eaff",
          metalness: 0.45,
          roughness: 0.2
        });
      }
    });
  }, [gltf]);

  // Animation : scroll = zoom + rotation
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = Math.PI / 2 + scroll * Math.PI * 1.6;
      group.current.rotation.x = 0.1 + scroll * 0.3;
      group.current.position.z = 3 - scroll * 2.8; // zoom avant
    }
  });

  return <primitive ref={group} object={gltf.scene} scale={2.2} />;
}

export default function AboutBrain() {
  // Récupère le scroll relatif sur la section "about"
  const [scroll, setScroll] = React.useState(0);
  const aboutRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onScroll() {
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // Scroll progress 0 = haut de la section, 1 = bas de la section
        const progress = Math.min(
          1,
          Math.max(0, (vh - rect.top) / (rect.height + vh))
        );
        setScroll(progress);
      }
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={aboutRef} className="w-full flex items-center justify-center" style={{ minHeight: 480 }}>
      <Canvas camera={{ position: [0, 0, 3.6], fov: 45 }}>
        <ambientLight intensity={1.3} />
        <directionalLight position={[1, 4, 4]} intensity={0.7} />
        <BrainModel scroll={scroll} />
        {/* Pas d'OrbitControls, c'est le scroll qui contrôle */}
      </Canvas>
    </div>
  );
}
