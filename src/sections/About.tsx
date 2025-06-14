import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Animation de particules connectées
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const particleCount = 65; // Moins de particules
    const maxDistance = 160; // Distance moyenne
    const mouse = { x: 0, y: 0 };

    // Redimensionner le canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Classe Particule
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      glowColor: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 2.5 + 1.5;
        
        // Couleurs mélangées rouge/orange/violet
        const colors = [
          { main: '#ff6347', glow: '#ff4500' }, // Rouge-orange
          { main: '#ff4500', glow: '#ffa500' }, // Orange
          { main: '#8a2be2', glow: '#9932cc' }, // Violet
          { main: '#ff1493', glow: '#ff69b4' }, // Rose-rouge
          { main: '#ff8c00', glow: '#ffd700' }  // Orange doré
        ];
        const colorSet = colors[Math.floor(Math.random() * colors.length)];
        this.color = colorSet.main;
        this.glowColor = colorSet.glow;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebond sur les bords
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Garder dans les limites
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 15;
        ctx.fill();
        
        // Halo externe coloré
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `${this.color}40`); // 25% opacity
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Initialiser les particules
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Dessiner les connexions
    const drawConnections = () => {
      if (!ctx) return;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (maxDistance - distance) / maxDistance;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 165, 0, ${opacity * 0.5})`; // Moins visible
            ctx.lineWidth = 1.5; // Lignes moyennes
            ctx.shadowColor = '#ffa500';
            ctx.shadowBlur = 3;
            ctx.stroke();
          }
        }
      }
    };

    // Animation principale
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mettre à jour et dessiner les particules
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Dessiner les connexions
      drawConnections();

      animationRef.current = requestAnimationFrame(animate);
    };

    // Gestion de la souris
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // Initialisation
    resizeCanvas();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.75 }} // Équilibre parfait
    />
  );
}

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative flex flex-col min-h-[100vh] py-20 px-4 overflow-hidden bg-black"
    >
      {/* Animation de particules en arrière-plan */}
      <ParticleNetwork />
      
      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-12">
        
        {/* Texte centré */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold mb-7 text-white drop-shadow-lg text-center">
              {t("aboutSection.title")}
            </h2>
            <p
              className="text-lg md:text-xl leading-relaxed text-white text-center"
              style={{ textShadow: "0 2px 16px #003e6b44" }}
            >
              {t("aboutSection.description")}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;