import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

// --- Animation fluid shapes ---
const FluidShapesAnimation = () => {
  const canvasRef = useRef(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [canvasSize, setCanvasSize] = useState(400);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 480) setCanvasSize(200);
      else if (window.innerWidth < 768) setCanvasSize(300);
      else setCanvasSize(400);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fadeStart = windowHeight * 0.3;
      const fadeEnd = windowHeight * 0.8;
      let opacity = 1;
      if (scrollPosition > fadeStart) {
        opacity = Math.max(0, 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart));
      }
      setScrollOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    let animationId;
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
          gradient.addColorStop(0, 'rgba(255, 140, 0, 0.9)');
          gradient.addColorStop(0.7, 'rgba(255, 69, 0, 0.7)');
          gradient.addColorStop(1, 'rgba(255, 140, 0, 0.3)');
        } else if (shape === 1) {
          gradient = ctx.createRadialGradient(0, 0, 20 * scaleFactor, 0, 0, 120 * scaleFactor);
          gradient.addColorStop(0, 'rgba(138, 43, 226, 0.9)');
          gradient.addColorStop(0.7, 'rgba(199, 21, 133, 0.7)');
          gradient.addColorStop(1, 'rgba(138, 43, 226, 0.3)');
        } else {
          gradient = ctx.createRadialGradient(0, 0, 20 * scaleFactor, 0, 0, 120 * scaleFactor);
          gradient.addColorStop(0, 'rgba(220, 20, 60, 0.9)');
          gradient.addColorStop(0.7, 'rgba(255, 99, 71, 0.7)');
          gradient.addColorStop(1, 'rgba(220, 20, 60, 0.3)');
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
        innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
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
      style={{ zIndex: 25, opacity: scrollOpacity }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="block"
        style={{
          filter: 'blur(0.5px)',
          mixBlendMode: 'screen',
          width: canvasSize + 'px',
          height: canvasSize + 'px'
        }}
      />
    </div>
  );
};

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir(i18n.language) === "rtl";
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
      const filamentHeight = height * 0.3;
      const baseY = height - filamentHeight / 2;
      const filamentCount = 8;
      const amplitude = 20;
      for (let i = 0; i < filamentCount; i++) {
        const yOffset = filamentHeight * (i / filamentCount);
        const gradient = ctx.createLinearGradient(0, baseY + yOffset, width, baseY + yOffset);
        gradient.addColorStop(0, "#ff69b4");
        gradient.addColorStop(0.5, "#ffa500");
        gradient.addColorStop(1, "#800080");
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.7 - i * 0.08;
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
  }, []);

  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center relative min-h-screen overflow-hidden"
      style={{ background: "none" }}
    >
      {/* Animation formes fluides */}
      <FluidShapesAnimation />

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
        }}
        aria-hidden="true"
      />

      {/* Boutons réseaux uniquement */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-20 text-center px-4 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-4 mt-8 ${isRtl ? "md:flex-row-reverse" : ""}`}
        >
          <a
            href="/CV-Raph-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white bg-white text-black font-medium rounded-lg transition-colors flex items-center justify-center min-w-[180px] hover:bg-[#ff69b4] hover:text-white hover:border-[#ff69b4]"
          >
            {t("homeSection.cv")}
          </a>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="https://github.com/Raphael91000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white bg-white text-black rounded-full transition-colors hover:bg-[#ff69b4] hover:text-white hover:border-[#ff69b4]"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/raphael-theuillon-689139261/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white bg-white text-black rounded-full transition-colors hover:bg-[#800080] hover:text-white hover:border-[#800080]"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;