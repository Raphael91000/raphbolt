import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
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
          roughness: 0.2,
        });
      }
    });
  }, [gltf]);

  // Animation : mouvement diagonal droite -> haut gauche, plus lent
  useFrame(() => {
    if (group.current) {
      // Départ à droite (x=2), arrivée à gauche (x=-1)
      group.current.position.x = 2 - scroll * 3; // Réduit de 4 à 3
      // Départ en bas (y=-0.5), montée vers le haut (y=1)
      group.current.position.y = -0.5 + scroll * 1.5; // Réduit de 2 à 1.5
      // Maintenir z constant pour éviter le zoom
      group.current.position.z = 2;
    }
  });

  // Taille réduite avec responsivité
  const scale = window.innerWidth < 640 ? 1.4 : 1.8; // Plus petit sur mobile

  return <primitive ref={group} object={gltf.scene} scale={scale} />;
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
    <div
      ref={aboutRef}
      className="w-full flex items-center justify-center min-h-[60vh] sm:min-h-[50vh]"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ height: "100%", width: "100%" }}
      >
        <React.Suspense fallback={null}>
          <ambientLight intensity={1.3} />
          <directionalLight position={[1, 4, 4]} intensity={0.7} />
          <BrainModel scroll={scroll} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
