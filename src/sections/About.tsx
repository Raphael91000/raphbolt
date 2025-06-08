import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useTranslation } from "react-i18next";

// Animation cerveau wireframe bleu
function BrainModelWire({ scroll }: { scroll: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/human-brain.glb");
  const rotationRef = useRef(0);

  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: "#22eaff",
          wireframe: true,
          transparent: true,
          opacity: 0.72,
        });
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (group.current) {
      const x = THREE.MathUtils.lerp(3.2, -3.2, scroll);
      group.current.position.x = x;
      const scale = 1.1 + (1 - Math.abs(0.5 - scroll)) * 0.18;
      group.current.scale.set(scale, scale, scale);
      rotationRef.current += delta * 0.4;
      group.current.rotation.y = Math.PI / 2 + rotationRef.current;
      group.current.rotation.z = 0.12 + scroll * 0.22;
    }
  });

  return (
    <group ref={group} position={[0, 0.07, 0]}>
      <primitive object={scene} />
    </group>
  );
}

const About: React.FC = () => {
  const { t } = useTranslation();
  const [scroll, setScroll] = React.useState(0);

  React.useEffect(() => {
    const handler = () => {
      const about = document.getElementById("about");
      if (!about) return;
      const rect = about.getBoundingClientRect();
      const vh = window.innerHeight;
      let s = 1 - Math.min(Math.max(rect.top / vh, 0), 1);
      s = Math.max(0, Math.min(1, s));
      setScroll(s);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center min-h-[100vh] py-20 px-4 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-10"
           style={{ width: "100vw", height: "100vh" }}>
        <Canvas camera={{ position: [0, 0, 3.8], fov: 38 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[1, 3, 2]} intensity={0.95} color="#eaffff" />
            <BrainModelWire scroll={scroll} />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-20 pt-[36vh] pb-8 flex flex-col items-center">
        <h2 className="text-5xl font-bold mb-7 text-white text-center drop-shadow-lg">
          {t("aboutSection.title")}
        </h2>
        <p
          className="text-lg md:text-xl leading-relaxed text-white max-w-3xl text-center"
          style={{ textShadow: "0 2px 16px #003e6b44" }}
        >
          {t("aboutSection.description")}
        </p>
      </div>
    </section>
  );
};

export default About;
