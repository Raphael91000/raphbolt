import React, { useRef, useEffect } from "react";

interface ParticleBackgroundProps {
  opacity?: number;
  particleCount?: number;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  opacity = 0.75, 
  particleCount = 45, // Compromis entre performance et visuel
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);
  const lastFrameTime = useRef(0);

  // FPS adaptatif selon la taille d'écran
  const getTargetFPS = () => {
    if (typeof window === 'undefined') return 30;
    return window.innerWidth < 768 ? 20 : 30; // Mobile plus lent
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetFPS = getTargetFPS();
    const frameInterval = 1000 / targetFPS;

    // Configuration responsive
    const getConfig = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile
        return {
          maxDistance: 100,
          particleSpeed: 0.3,
          connectionOpacity: 0.4,
          effectiveParticleCount: Math.max(25, Math.floor(particleCount * 0.6))
        };
      } else if (width < 1024) {
        // Tablet
        return {
          maxDistance: 130,
          particleSpeed: 0.4,
          connectionOpacity: 0.5,
          effectiveParticleCount: Math.max(35, Math.floor(particleCount * 0.8))
        };
      } else {
        // Desktop
        return {
          maxDistance: 150,
          particleSpeed: 0.5,
          connectionOpacity: 0.6,
          effectiveParticleCount: particleCount
        };
      }
    };

    let config = getConfig();

    // Redimensionner le canvas
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      config = getConfig();
      initParticles(); // Réinitialiser avec le nouveau config
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
        this.vx = (Math.random() - 0.5) * config.particleSpeed;
        this.vy = (Math.random() - 0.5) * config.particleSpeed;
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
        ctx.shadowBlur = 12;
        ctx.fill();
        
        // Halo externe coloré (responsive)
        const haloSize = window.innerWidth < 768 ? this.size * 1.5 : this.size * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, haloSize, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, haloSize);
        gradient.addColorStop(0, `${this.color}40`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Initialiser les particules
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < config.effectiveParticleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Dessiner les connexions - MÊME DENSITÉ QUE ABOUT
    const drawConnections = () => {
      if (!ctx) return;
      const particles = particlesRef.current;

      // Connexions colorées aléatoires
      const connectionColors = [
        '#ff6347', // Rouge
        '#ff4500', // Orange  
        '#8a2be2', // Violet
        '#ff1493', // Rose
        '#ff8c00'  // Orange doré
      ];

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.maxDistance) {
            const opacityCalc = (config.maxDistance - distance) / config.maxDistance;
            const randomColor = connectionColors[Math.floor(Math.random() * connectionColors.length)];
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `${randomColor}${Math.floor(opacityCalc * config.connectionOpacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = window.innerWidth < 768 ? 1 : 1.5;
            ctx.stroke();
          }
        }
      }
    };

    // Animation principale
    const animate = (currentTime: number) => {
      // Throttle FPS
      if (currentTime - lastFrameTime.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTime.current = currentTime;

      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mettre à jour et dessiner les particules
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Dessiner TOUTES les connexions (comme About)
      drawConnections();

      animationRef.current = requestAnimationFrame(animate);
    };

    // Gestion du resize avec debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 250);
    };

    // Initialisation
    resizeCanvas();
    animate(0);

    // Event listeners
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ 
        opacity,
        willChange: 'auto',
        transform: 'translateZ(0)'
      }}
    />
  );
};

export default ParticleBackground;