import React, { useState, useEffect } from "react";

interface SplitRevealTextProps {
  children: string;
  duration?: number; // en secondes
  color?: string;
  className?: string;
}

const DEFAULT_COLOR = "#15f7e9";

const SplitRevealText: React.FC<SplitRevealTextProps> = ({
  children,
  duration = 1,
  color = DEFAULT_COLOR,
  className = "",
}) => {
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setRevealed(false);
    setDone(false);
    const timer1 = setTimeout(() => setRevealed(true), 30);
    const timer2 = setTimeout(() => setDone(true), duration * 1000); // Attend la fin de la transition
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [children, duration]);

  if (done) {
    // Affiche le texte normal une fois l'animation terminée
    return (
      <span
        className={`inline-block font-bold leading-none select-none ${className}`}
        style={{
          color,
          lineHeight: 1.08,
          background: "transparent",
        }}
      >
        {children}
      </span>
    );
  }

  // Diviser le texte en deux parties (gauche et droite)
  const middle = Math.ceil(children.length / 2);
  const left = children.slice(0, middle);
  const right = children.slice(middle);

  return (
    <div
      className={`inline-flex items-center ${className}`}
      style={{ color, lineHeight: 1.08, background: "transparent" }}
    >
      <span
        className="left-part"
        style={{
          transform: revealed ? "translateX(0)" : "translateX(-50vw)",
          transition: `transform ${duration}s ease`,
          whiteSpace: "nowrap",
        }}
      >
        {left}
      </span>
      <span
        className="right-part"
        style={{
          transform: revealed ? "translateX(0)" : "translateX(50vw)",
          transition: `transform ${duration}s ease`,
          whiteSpace: "nowrap",
        }}
      >
        {right}
      </span>
    </div>
  );
};

export default SplitRevealText;
