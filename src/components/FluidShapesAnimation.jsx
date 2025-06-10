import React, { useRef, useEffect } from "react";

// Composant d'animation formes fluides intégré
const FluidShapesAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = 400;
    canvas.width = size;
    canvas.height = size;

    let animationId;

    const drawFluidShapes = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      
      const time = Date.now() * 0.001; // Animation lente et fluide
      
      // Dessiner 3 formes fluides qui s'entrelacent
      for (let shape = 0; shape < 3; shape++) {
        const shapeOffset = (shape * Math.PI * 2) / 3;
        const wavePhase = time + shape * 2;
        
        // Définir les couleurs pour chaque forme
        let gradient;
        if (shape === 0) {
          // Orange vers rouge
          gradient = ctx.createRadialGradient(0, 0, 20, 0, 0, 120);
          gradient.addColorStop(0, 'rgba(255, 140, 0, 0.9)'); // Orange vif
          gradient.addColorStop(0.7, 'rgba(255, 69, 0, 0.7)'); // Rouge-orange
          gradient.addColorStop(1, 'rgba(255, 140, 0, 0.3)');
        } else if (shape === 1) {
          // Violet vers rouge
          gradient = ctx.createRadialGradient(0, 0, 20, 0, 0, 120);
          gradient.addColorStop(0, 'rgba(138, 43, 226, 0.9)'); // Violet
          gradient.addColorStop(0.7, 'rgba(199, 21, 133, 0.7)'); // Violet-rouge
          gradient.addColorStop(1, 'rgba(138, 43, 226, 0.3)');
        } else {
          // Rouge vers orange
          gradient = ctx.createRadialGradient(0, 0, 20, 0, 0, 120);
          gradient.addColorStop(0, 'rgba(220, 20, 60, 0.9)'); // Rouge crimson
          gradient.addColorStop(0.7, 'rgba(255, 99, 71, 0.7)'); // Rouge-orange
          gradient.addColorStop(1, 'rgba(220, 20, 60, 0.3)');
        }
        
        // Créer une forme fluide organique
        ctx.beginPath();
        
        const segments = 80;
        const baseRadius = 60 + shape * 20;
        
        for (let i = 0; i <= segments; i++) {
          const t = (i / segments) * Math.PI * 2;
          
          // Créer des ondulations complexes pour la forme fluide
          const wave1 = Math.sin(t * 3 + wavePhase) * 15;
          const wave2 = Math.cos(t * 5 + wavePhase * 0.7) * 8;
          const wave3 = Math.sin(t * 2 + wavePhase * 1.3) * 12;
          
          // Position de base avec rotation
          const baseAngle = t + shapeOffset + time * 0.1;
          const radius = baseRadius + wave1 + wave2 + wave3;
          
          // Distorsion pour créer des formes organiques
          const distortion = Math.sin(t * 4 + wavePhase) * 0.1;
          
          const x = Math.cos(baseAngle + distortion) * radius;
          const y = Math.sin(baseAngle + distortion) * radius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        
        // Remplir avec le gradient
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Ajouter un contour subtil avec effet de brillance
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Ajouter des reflets internes
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const t = (i / segments) * Math.PI * 2;
          const wave1 = Math.sin(t * 3 + wavePhase) * 15;
          const wave2 = Math.cos(t * 5 + wavePhase * 0.7) * 8;
          const wave3 = Math.sin(t * 2 + wavePhase * 1.3) * 12;
          
          const baseAngle = t + shapeOffset + time * 0.1;
          const radius = (baseRadius + wave1 + wave2 + wave3) * 0.6; // Plus petit pour l'effet interne
          
          const distortion = Math.sin(t * 4 + wavePhase) * 0.1;
          const x = Math.cos(baseAngle + distortion) * radius;
          const y = Math.sin(baseAngle + distortion) * radius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        
        // Gradient pour l'effet de brillance interne
        const innerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
        innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
        
        ctx.fillStyle = innerGradient;
        ctx.fill();
      }
      
      ctx.restore();
      animationId = requestAnimationFrame(drawFluidShapes);
    };

    drawFluidShapes();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ zIndex: 25 }}>
      <canvas
        ref={canvasRef}
        className="opacity-80"
        style={{
          filter: 'blur(0.5px)',
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};

export default FluidShapesAnimation;