import React, { useRef, useEffect, useCallback } from "react";

interface ParticleBackgroundProps {
  opacity?: number;
  particleCount?: number;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  opacity = 0.75, 
  particleCount = 35, // Réduit de 65 à 35
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);
  const isVisibleRef = useRef(true);
  const lastFrameTime = useRef(0);

  // Throttle animation to 30 FPS instead of 60
  const targetFPS = 30;
  const frameInterval = 1000 / targetFPS;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration optimisée
    const maxDistance = 120; // Réduit de 160 à 120
    
    // Redimensionner le canvas avec throttling
    const resizeCanvas = () => {
      canvas.width = Math.min(canvas.offsetWidth, 1920); // Limite la résolution
      canvas.height = Math.min(canvas.offsetHeight, 1080);
    };

    // Classe Particule optimisée
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
        this.vx = (Math.random() - 0.5) * 0.4; // Mouvement plus lent
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1.5; // Tailles plus petites
        
        // Couleurs pré-calculées
        const colors = [
          { main: '#ff6347', glow: '#ff4500' },
          { main: '#ff4500', glow: '#ffa500' },
          { main: '#8a2be2', glow: '#9932cc' },
          { main: '#ff1493', glow: '#ff69b4' },
          { main: '#ff8c00', glow: '#ffd700' }
        ];
        const colorSet = colors[Math.floor(Math.random() * colors.length)];
        this.color = colorSet.main;
        this.glowColor = colorSet.glow;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebond optimisé
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        if (!ctx) return;
        
        // Dessin simplifié - moins d'effets
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8; // Réduit de 15 à 8
        ctx.shadowColor = this.glowColor;
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

    // Connexions optimisées avec cache
    const drawConnections = () => {
      if (!ctx) return;
      const particles = particlesRef.current;

      // Dessiner moins de connexions
      for (let i = 0; i < particles.length; i += 2) { // Skip every other particle
        for (let j = i + 2; j < particles.length; j += 2) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacityCalc = (maxDistance - distance) / maxDistance;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 165, 0, ${opacityCalc * 0.3})`; // Opacité réduite
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    // Animation avec FPS limité
    const animate = (currentTime: number) => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Throttle to target FPS
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

      // Dessiner les connexions (moins fréquemment)
      if (Math.floor(currentTime / 100) % 2 === 0) { // Every 200ms
        drawConnections();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Observer d'intersection pour pause/resume
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    // Throttled resize
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 250);
    };

    // Initialisation
    resizeCanvas();
    initParticles();
    animate(0);

    // Event listeners
    window.addEventListener('resize', throttledResize);
    if (canvas) intersectionObserver.observe(canvas);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', throttledResize);
      intersectionObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ 
        opacity,
        willChange: 'auto', // Optimisation CSS
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
    />
  );
};

export default ParticleBackground;