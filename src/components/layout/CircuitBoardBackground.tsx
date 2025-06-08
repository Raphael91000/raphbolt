import React, { useRef, useEffect } from "react";

const CircuitBoardBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight * 6; // Ajusté pour couvrir toutes les sections (6 sections estimées)
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight * 6; // Ajuster dynamiquement selon le nombre de sections
      canvas.width = width;
      canvas.height = height;
      drawGradient();
    }
    window.addEventListener("resize", handleResize);

    function drawGradient() {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#013C47");    // Haut (bleu-vert profond)
      gradient.addColorStop(0.6, "#10B5C4");  // Milieu (turquoise lumineux, à 60% de la hauteur totale)
      gradient.addColorStop(1, "#FFFFFF");    // Bas (blanc pur, sur Contact)
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    drawGradient();

    // Positionnement fixe pour couvrir toutes les sections
    const updatePosition = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      canvas.style.top = `-${scrollTop}px`;
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100vw", height: "600vh" }} // Hauteur estimée pour 6 sections
    />
  );
};

export default CircuitBoardBackground;