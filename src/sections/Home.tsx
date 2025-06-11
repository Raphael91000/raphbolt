import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SocialButtons from "../components/layout/SocialButtons";

// --- Animation fluid shapes ---
const FluidShapesAnimation = ({ opacity = 1 }: { opacity?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState(400);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 480) setCanvasSize(150); // Plus petit sur mobile
      else if (window.innerWidth < 768) setCanvasSize(250);
      else setCanvasSize(400);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    let animationId: number;

    const drawFluidShapes = () => {
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      ctx.save();
      ctx.translate(canvasSize / 2, canvasSize / 2);
      const time = Date.now() * 0.001;
      const scaleFactor = canvasSize / 400;
      for (let shape = 0; shape < 3; shape++) {
        const shapeOffset = (shape * Math.PI * 2) / 3;
        const wavePhase = time + shape * 2;
        let gradient;
        if (shape === 0) {
          gradient = ctx.createRadialGradient(0, 0, 20 * scaleFactor, 0, 0, 120 * scaleFactor);
          gradient.addColorStop(0, "rgba(255, 165, 0, 0.9)"); // Orange
          gradient.addColorStop(0.3, "rgba(255, 34, 68, 0.7)"); // Rouge
          gradient.addColorStop(0.6, "rgba(128, 0, 128, 0.7)"); // Violet
          gradient.addColorStop(1, "rgba(255, 165, 0, 0.3)");
        } else if (shape === 1) {
          gradient = ctx.createRadialGradient(0, 0, 20 * scaleFactor, 0, 0, 120 * scaleFactor);
          gradient.addColorStop(0, "rgba(255, 34, 68, 0.9)"); // Rouge
          gradient.addColorStop(0.3, "rgba(128, 0, 128, 0.7)"); // Violet
          gradient.addColorStop(0.6, "rgba(255, 165, 0, 0.7)"); // Retour à orange
          gradient.addColorStop(1, "rgba(255, 34, 68, 0.3)");
        } else {
          gradient = ctx.createRadialGradient(0, 0, 20 * scaleFactor, 0, 0, 120 * scaleFactor);
          gradient.addColorStop(0, "rgba(128, 0, 128, 0.9)"); // Violet
          gradient.addColorStop(0.3, "rgba(255, 165, 0, 0.7)"); // Orange
          gradient.addColorStop(0.6, "rgba(255, 34, 68, 0.7)"); // Rouge
          gradient.addColorStop(1, "rgba(128, 0, 128, 0.3)");
        }
        ctx.beginPath();
        const segments = 80;
        const baseRadius = (60 + shape * 20) * scaleFactor;
        for (let i = 0; i <= segments; i++) {
          const t = (i / segments) * Math.PI * 2;
          const wave1 = Math.sin(t * 3 + wavePhase) * 15 * scaleFactor;
          const wave2 = Math.cos(t * 5 + wavePhase * 0.7) * 8 * scaleFactor;
          const wave3 = Math.sin(t * 2 + wavePhase * 1.3) * 12 * scaleFactor;
          const baseAngle = t + shapeOffset + time * 0.1;
          const radius = baseRadius + wave1 + wave2 + wave3;
          const distortion = Math.sin(t * 4 + wavePhase) * 0.1;
          const x = Math.cos(baseAngle + distortion) * radius;
          const y = Math.sin(baseAngle + distortion) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 * scaleFactor;
        ctx.stroke();
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const t = (i / segments) * Math.PI * 2;
          const wave1 = Math.sin(t * 3 + wavePhase) * 15 * scaleFactor;
          const wave2 = Math.cos(t * 5 + wavePhase * 0.7) * 8 * scaleFactor;
          const wave3 = Math.sin(t * 2 + wavePhase * 1.3) * 12 * scaleFactor;
          const baseAngle = t + shapeOffset + time * 0.1;
          const radius = (baseRadius + wave1 + wave2 + wave3) * 0.6;
          const distortion = Math.sin(t * 4 + wavePhase) * 0.1;
          const x = Math.cos(baseAngle + distortion) * radius;
          const y = Math.sin(baseAngle + distortion) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        const innerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 40 * scaleFactor);
        innerGradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
        innerGradient.addColorStop(1, "rgba(255, 255, 255, 0.05)");
        ctx.fillStyle = innerGradient;
        ctx.fill();
      }
      ctx.restore();
      animationId = requestAnimationFrame(drawFluidShapes);
    };
    drawFluidShapes();
    return () => { if (animationId) cancelAnimationFrame(animationId); };
  }, [canvasSize]);

  return (
    <div 
      className="fixed right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 pointer-events-none transition-opacity duration-300" 
      style={{ zIndex: 20, opacity }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="block"
        style={{
          filter: "blur(0.5px)",
          mixBlendMode: "screen",
          width: canvasSize + "px",
          height: canvasSize + "px"
        }}
      />
    </div>
  );
};

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir(i18n.language) === "rtl";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasOpacity, setCanvasOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const h = window.innerHeight;
      let o = 1;
      if (scrollY > h * 0.2) {
        o = Math.max(0, 1 - (scrollY - h * 0.2) / (h * 0.6));
      }
      setCanvasOpacity(o);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = canvasOpacity;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
      const filamentHeight = height * 0.3;
      const baseY = height - filamentHeight / 2;
      const filamentCount = 8;
      const amplitude = 20;
      for (let i = 0; i < filamentCount; i++) {
        const yOffset = filamentHeight * (i / filamentCount);
        const gradient = ctx.createLinearGradient(0, baseY + yOffset, width, baseY + yOffset);
        gradient.addColorStop(0, "#ffa500"); // Orange
        gradient.addColorStop(0.3, "#ff2244"); // Rouge
        gradient.addColorStop(0.6, "#800080"); // Violet
        gradient.addColorStop(1, "#ffa500"); // Retour à orange
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = canvasOpacity * (0.7 - i * 0.08);
        for (let x = 0; x <= width; x += 10) {
          const y = baseY + yOffset + Math.sin((x + t * 50) * 0.01 + i) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      t += 0.05;
      requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [canvasOpacity]);

  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center relative min-h-screen overflow-hidden"
      style={{ background: "none" }}
    >
      {/* Animation formes fluides par-dessus (z-20) */}
      <FluidShapesAnimation opacity={canvasOpacity} />

      {/* Fond canvas principal (z-10) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          width: "100vw",
          height: "100vh",
          minHeight: "100dvh",
          position: "fixed",
          left: 0,
          top: 0,
          background: "#000000",
          opacity: canvasOpacity,
          transition: "opacity 0.4s",
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />

      {/* Texte "Welcome to my World" - Version desktop et mobile différentes */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute left-4 sm:left-8 md:left-12 lg:left-16 top-[20%] sm:top-[15%] md:top-[10%] lg:top-[8%] transform -translate-y-1/4 z-30 w-[85%] sm:w-[70%] md:w-[50%] lg:w-[45%]"
        style={{ opacity: canvasOpacity }}
      >
        {/* Version Mobile/Tablette (caché sur desktop) */}
        <div className="text-left leading-tight block md:hidden">
          {/* Welcome to my */}
          <div className="text-white text-3xl sm:text-4xl font-light tracking-wide mb-2">
            Welcome to my
          </div>
          
          {/* WORLD avec dégradé */}
          <div 
            className="text-5xl sm:text-6xl font-bold tracking-wide leading-none"
            style={{
              background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #800080)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(255, 165, 0, 0.6)"
            }}
          >
            WORLD
          </div>
        </div>

        {/* Version Desktop (caché sur mobile/tablette) */}
        <div className="text-left leading-tight hidden md:block">
          {/* Welcome to my */}
          <div className="text-white text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light tracking-wide mb-3 md:mb-4">
            Welcome to my
          </div>
          
          {/* WORLD avec dégradé */}
          <div 
            className="text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold tracking-wide leading-none"
            style={{
              background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #800080)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(255, 165, 0, 0.6)"
            }}
          >
            WORLD
          </div>
        </div>
      </motion.div>

      {/* Boutons réseaux sociaux en bas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-20 w-full flex justify-center pb-8 sm:pb-6 md:pb-4"
      >
        <SocialButtons />
      </motion.div>
    </section>
  );
};

export default Home;