import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SocialButtons from "../components/layout/SocialButtons";
import CVButton from "../components/layout/CVButton";

// --- Hook pour gérer les positions responsives ---
const useResponsivePositions = () => {
  const [positions, setPositions] = useState({
    textMarginTop: '-490px',
    animationMarginTop: '-55px',
    animationScale: 1.2,
    socialButtonsBottom: '20%',
    cvButtonBottom: '17%'
  });

  useEffect(() => {
    const updatePositions = () => {
      const width = window.innerWidth;
      
      console.log('🔍 LARGEUR DÉTECTÉE:', width, 'px');
      
      if (width <= 767) {
        console.log('📱 MOBILE - Positions 20% et 17%');
        setPositions({
          textMarginTop: '-490px',
          animationMarginTop: '-55px',
          animationScale: 1.2,
          socialButtonsBottom: '20%',
          cvButtonBottom: '17%'
        });
      } else if (width < 1280) {
        console.log('💻 TABLETTE/ÉCRAN DIVISÉ - Positions normales');
        setPositions({
          textMarginTop: '-640px',
          animationMarginTop: '-100px',
          animationScale: 1.2,
          socialButtonsBottom: '28%',    // Espacement normal
          cvButtonBottom: '20%'          // Position CV
        });
      } else {
        console.log('🖥️ DESKTOP - Layout côte à côte');
      }
    };

    // MULTIPLE LISTENERS POUR FORCER LE DÉCLENCHEMENT
    updatePositions();
    
    window.addEventListener('resize', updatePositions);
    window.addEventListener('orientationchange', updatePositions);
    
    // FORCE UPDATE TOUTES LES 500ms pendant 3 secondes
    const intervals = [];
    for (let i = 0; i < 6; i++) {
      intervals.push(setTimeout(updatePositions, i * 500));
    }
    
    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('orientationchange', updatePositions);
      intervals.forEach(clearTimeout);
    };
  }, []);

  return positions;
};

// --- Animation fluid shapes ---
const FluidShapesAnimation = ({ opacity = 1 }: { opacity?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState(400);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 480) setCanvasSize(140);
      else if (window.innerWidth < 768) setCanvasSize(180);
      else if (window.innerWidth < 1025) setCanvasSize(240);
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
    if (!ctx) return;
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
          gradient.addColorStop(0, "rgba(255, 165, 0, 0.9)");
          gradient.addColorStop(0.3, "rgba(255, 34, 68, 0.7)");
          gradient.addColorStop(0.6, "rgba(128, 0, 128, 0.7)");
          gradient.addColorStop(1, "rgba(255, 165, 0, 0.3)");
        } else if (shape === 1) {
          gradient = ctx.createRadialGradient(0, 0, 20 * scaleFactor, 0, 0, 120 * scaleFactor);
          gradient.addColorStop(0, "rgba(255, 34, 68, 0.9)");
          gradient.addColorStop(0.3, "rgba(128, 0, 128, 0.7)");
          gradient.addColorStop(0.6, "rgba(255, 165, 0, 0.7)");
          gradient.addColorStop(1, "rgba(255, 34, 68, 0.3)");
        } else {
          gradient = ctx.createRadialGradient(0, 0, 20 * scaleFactor, 0, 0, 120 * scaleFactor);
          gradient.addColorStop(0, "rgba(128, 0, 128, 0.9)");
          gradient.addColorStop(0.3, "rgba(255, 165, 0, 0.7)");
          gradient.addColorStop(0.6, "rgba(255, 34, 68, 0.7)");
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
      className="absolute pointer-events-none transition-opacity duration-300" 
      style={{ 
        zIndex: 20, 
        opacity,
        right: 'clamp(1rem, 5vw, 4rem)',
        top: 'clamp(-2rem, -1vh, 1rem)',
        transform: 'none'
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="hidden xl:block"
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

// --- Animation mobile/tablette responsive ---
const ResponsiveMobileAnimation = ({ opacity = 1, scale = 1.2 }: { opacity?: number, scale?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState(200);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 1024) setCanvasSize(160);
      else setCanvasSize(240);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
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
          gradient.addColorStop(0, "rgba(255, 165, 0, 0.9)");
          gradient.addColorStop(0.3, "rgba(255, 34, 68, 0.7)");
          gradient.addColorStop(0.6, "rgba(128, 0, 128, 0.7)");
          gradient.addColorStop(1, "rgba(255, 165, 0, 0.3)");
        } else if (shape === 1) {
          gradient = ctx.createRadialGradient(0, 0, 20 * scaleFactor, 0, 0, 120 * scaleFactor);
          gradient.addColorStop(0, "rgba(255, 34, 68, 0.9)");
          gradient.addColorStop(0.3, "rgba(128, 0, 128, 0.7)");
          gradient.addColorStop(0.6, "rgba(255, 165, 0, 0.7)");
          gradient.addColorStop(1, "rgba(255, 34, 68, 0.3)");
        } else {
          gradient = ctx.createRadialGradient(0, 0, 20 * scaleFactor, 0, 0, 120 * scaleFactor);
          gradient.addColorStop(0, "rgba(128, 0, 128, 0.9)");
          gradient.addColorStop(0.3, "rgba(255, 165, 0, 0.7)");
          gradient.addColorStop(0.6, "rgba(255, 34, 68, 0.7)");
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
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      className="block pointer-events-none"
      style={{
        filter: "blur(0.5px)",
        mixBlendMode: "screen",
        width: canvasSize + "px",
        height: canvasSize + "px",
        opacity,
        transform: `scale(${scale})`
      }}
    />
  );
};

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir(i18n.language) === "rtl";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const [isOnHomePage, setIsOnHomePage] = useState(true);
  const worldRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  
  // Hook responsive pour les positions
  const positions = useResponsivePositions();
  
  // État pour l'effet machine à écrire
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = [
    "Développeur Full-Stack",
    "Commercial", 
    "Digital Marketing",
    "Réseaux Sociaux"
  ];

  // Effet machine à écrire
  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    
    const currentRole = roles[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentRole.length) {
          setCurrentText(currentRole.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentRole.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, roles]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const h = window.innerHeight;
      let o = 1;
      if (scrollY > h * 0.2) {
        o = Math.max(0, 1 - (scrollY - h * 0.2) / (h * 0.6));
      }
      setCanvasOpacity(o);
      setIsOnHomePage(scrollY < h * 0.9);
    };
    
    setIsOnHomePage(true);
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fonction pour aligner les textes
  useEffect(() => {
    const alignTexts = () => {
      if (worldRef.current && welcomeRef.current) {
        const worldWidth = worldRef.current.getBoundingClientRect().width;
        welcomeRef.current.style.width = `${worldWidth}px`;
        welcomeRef.current.offsetHeight;
      }
    };

    const performAlignment = () => {
      alignTexts();
      setTimeout(alignTexts, 50);
      setTimeout(alignTexts, 150);
      setTimeout(alignTexts, 300);
      setTimeout(alignTexts, 500);
    };

    performAlignment();
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(alignTexts, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    if (document.fonts) {
      document.fonts.ready.then(alignTexts);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
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
        gradient.addColorStop(0, "#ffa500");
        gradient.addColorStop(0.3, "#ff2244");
        gradient.addColorStop(0.6, "#800080");
        gradient.addColorStop(1, "#ffa500");
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
      className="relative min-h-screen overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Animation formes fluides - VISIBLE SUR TOUS LES ÉCRANS */}
      <FluidShapesAnimation opacity={canvasOpacity} />

      {/* Fond canvas principal - MASQUÉ SUR MOBILE ET TABLETTE */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-10 pointer-events-none hidden xl:block"
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

      {/* Layout Desktop UNIQUEMENT - côte à côte */}
      <div className="relative z-30 w-full px-4 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-12 md:pt-16 hidden xl:block">
        <div className="flex items-start justify-between w-full max-w-7xl mx-auto bg-transparent">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 flex flex-col items-start"
            style={{ opacity: canvasOpacity }}
          >
            <div className="flex flex-col items-start">
              <div 
                ref={welcomeRef}
                className="text-white font-light tracking-wide mb-1 sm:mb-2 leading-tight text-left"
                style={{ 
                  fontSize: "clamp(1rem, 3.5vw, 4rem)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textAlign: "left"
                }}
              >
                Welcome to my
              </div>
              
              <div 
                ref={worldRef}
                className="font-bold tracking-wide leading-none mb-1 sm:mb-2"
                style={{
                  fontSize: "clamp(2rem, 7vw, 14rem)",
                  background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #800080)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 40px rgba(255, 165, 0, 0.6)",
                  whiteSpace: "nowrap"
                }}
              >
                WORLD
              </div>
              
              <div 
                className="text-white font-medium tracking-wide flex items-center"
                style={{ 
                  fontSize: "clamp(1rem, 2.8vw, 2.2rem)",
                  minHeight: "clamp(2rem, 5vw, 3rem)"
                }}
              >
                <span
                  style={{
                    color: "#ffffff",
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
                  }}
                >
                  {currentText}
                </span>
                <span 
                  className="ml-1 animate-pulse" 
                  style={{ 
                    color: "#ffa500",
                    fontSize: "clamp(1rem, 2.8vw, 2.2rem)"
                  }}
                >
                  |
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 relative flex items-start justify-end h-96">
            {/* L'animation est positionnée via le CSS dans FluidShapesAnimation */}
          </div>
        </div>
      </div>

      {/* Layout MOBILE ET TABLETTE - DISPOSITION VERTICALE */}
      <div className="xl:hidden absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-30" style={{
        background: 'transparent',
        pointerEvents: 'none'
      }}>
        
        {/* Texte "Welcome to my World" avec position responsive */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col items-center text-center"
          style={{ 
            opacity: canvasOpacity,
            marginTop: positions.textMarginTop,
            pointerEvents: 'none'
          }}
        >
          <div 
            className="text-white font-medium tracking-wide mb-1 leading-tight"
            style={{ 
              fontSize: "clamp(2rem, 7vw, 3rem)"
            }}
          >
            Welcome to my
          </div>
          
          <div 
            className="font-bold tracking-wide leading-none mb-1"
            style={{
              fontSize: "clamp(4rem, 15vw, 8rem)",
              background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #800080)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(255, 165, 0, 0.6)"
            }}
          >
            WORLD
          </div>
          
          <div 
            className="text-white font-medium tracking-wide flex items-center justify-center"
            style={{ 
              fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
              minHeight: "3rem"
            }}
          >
            <span
              style={{
                color: "#ffffff",
                textShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
              }}
            >
              {currentText}
            </span>
            <span 
              className="ml-1 animate-pulse" 
              style={{ 
                color: "#ffa500",
                fontSize: "clamp(1.5rem, 5vw, 2.2rem)"
              }}
            >
              |
            </span>
          </div>
        </motion.div>
      </div>

      {/* Animation fluide avec position et scale responsives */}
      <div className="xl:hidden absolute top-0 left-0 w-full h-full flex items-center justify-center z-20" style={{
        background: 'transparent',
        pointerEvents: 'none'
      }}>
        <div className="flex justify-center" style={{ 
          marginTop: positions.animationMarginTop,
          pointerEvents: 'none' 
        }}>
          <div 
            className="pointer-events-none"
            style={{ 
              transform: `scale(${positions.animationScale}) translateY(-30px)`,
              opacity: canvasOpacity > 0.5 ? 1 : 0
            }}
          >
            <ResponsiveMobileAnimation 
              opacity={canvasOpacity > 0.5 ? 1 : 0}
              scale={positions.animationScale}
            />
          </div>
        </div>
      </div>

      {/* MOBILE ET TABLETTE : Boutons réseaux sociaux avec position responsive */}
      <div className="xl:hidden absolute left-1/2 transform -translate-x-1/2 z-50" style={{ 
        bottom: positions.socialButtonsBottom,
        transition: 'bottom 0.3s ease'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pointer-events-auto"
          style={{ 
            opacity: canvasOpacity,
            pointerEvents: 'auto'
          }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <SocialButtons />
          </div>
        </motion.div>
      </div>

      {/* MOBILE ET TABLETTE : Bouton CV avec position responsive */}
      <div className="xl:hidden absolute left-1/2 transform -translate-x-1/2 z-50" style={{ 
        bottom: positions.cvButtonBottom,
        transition: 'bottom 0.3s ease'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pointer-events-auto"
          style={{ 
            opacity: canvasOpacity,
            pointerEvents: 'auto'
          }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <CVButton />
          </div>
        </motion.div>
      </div>

      {/* Desktop UNIQUEMENT : boutons empilés */}
      <div className="hidden xl:block absolute left-1/2 transform -translate-x-1/2 z-50" style={{ bottom: '8%' }}>
        {/* Boutons réseaux sociaux */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-4 pointer-events-auto"
          style={{ 
            opacity: canvasOpacity,
            pointerEvents: 'auto'
          }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <SocialButtons />
          </div>
        </motion.div>

        {/* Bouton CV */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center pointer-events-auto"
          style={{ 
            opacity: canvasOpacity,
            pointerEvents: 'auto'
          }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <CVButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;