import React, { useRef, useEffect } from 'react';

const COLORS = ['#23C6E6', '#2ED6FF', '#1571E1', '#36FFED', '#6CFFF8'];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BackgroundBeams: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', resize);

    // --- Beams setup ---
    const beams = Array.from({ length: 15 }).map(() => ({
      x: randomInt(0, width),
      y: randomInt(0, height),
      angle: Math.random() * 2 * Math.PI,
      speed: randomInt(40, 85) / 100, // px/frame
      length: randomInt(220, 430),
      color: COLORS[randomInt(0, COLORS.length - 1)],
      thickness: randomInt(1, 3)
    }));

    function drawBeams() {
      ctx!.clearRect(0, 0, width, height);

      // Halo central (optionnel)
      ctx!.save();
      ctx!.globalAlpha = 0.24;
      ctx!.beginPath();
      ctx!.arc(width / 2, height / 2, 120, 0, 2 * Math.PI);
      const radial = ctx!.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, 120
      );
      radial.addColorStop(0, '#59f6ff');
      radial.addColorStop(0.5, '#1a5b7a66');
      radial.addColorStop(1, 'transparent');
      ctx!.fillStyle = radial;
      ctx!.fill();
      ctx!.restore();

      // Beams
      beams.forEach(beam => {
        // Next position
        beam.x += Math.cos(beam.angle) * beam.speed;
        beam.y += Math.sin(beam.angle) * beam.speed;

        // Bounce on border
        if (beam.x < 0 || beam.x > width) beam.angle = Math.PI - beam.angle;
        if (beam.y < 0 || beam.y > height) beam.angle = -beam.angle;

        ctx!.save();
        ctx!.globalAlpha = 0.44;
        ctx!.shadowBlur = 16;
        ctx!.shadowColor = beam.color;
        ctx!.strokeStyle = beam.color;
        ctx!.lineWidth = beam.thickness;
        ctx!.beginPath();
        ctx!.moveTo(beam.x, beam.y);
        ctx!.lineTo(
          beam.x + Math.cos(beam.angle) * beam.length,
          beam.y + Math.sin(beam.angle) * beam.length
        );
        ctx!.stroke();
        ctx!.restore();
      });
    }

    function animate() {
      drawBeams();
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default BackgroundBeams;
