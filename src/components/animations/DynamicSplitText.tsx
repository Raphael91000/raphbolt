import React, { useEffect, useState, useRef } from "react";
import "./DynamicSplitText.css";

interface DynamicSplitTextProps {
  text: string;
  duration?: number;
  className?: string;
}

const DynamicSplitText: React.FC<DynamicSplitTextProps> = ({ text, duration = 700, className }) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // On récupère dynamiquement la hauteur pour un split parfait
  const [splitHeight, setSplitHeight] = useState(0);

  useEffect(() => {
    setShow(false);
    const timeout = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(timeout);
  }, [text]);

  useEffect(() => {
    if (ref.current) {
      setSplitHeight(ref.current.offsetHeight / 2);
    }
  }, [text, ref.current]);

  return (
    <span className={`split-true-container ${className || ""}`}>
      {/* invisible pour mesurer la hauteur exacte */}
      <span ref={ref} className="split-true-measure" aria-hidden>{text}</span>

      {/* Moitié haute */}
      <span
        className={`split-true-half split-true-top${show ? " in" : ""}`}
        style={{
          "--split-h": `${splitHeight}px`,
          "--anim-duration": `${duration}ms`
        } as React.CSSProperties}
      >
        <span className="split-true-inner">{text}</span>
      </span>
      {/* Moitié basse */}
      <span
        className={`split-true-half split-true-bottom${show ? " in" : ""}`}
        style={{
          "--split-h": `${splitHeight}px`,
          "--anim-duration": `${duration}ms`
        } as React.CSSProperties}
      >
        <span className="split-true-inner">{text}</span>
      </span>
    </span>
  );
};

export default DynamicSplitText;
