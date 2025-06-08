import React from "react";

// Génére du code à afficher sur toute la hauteur de l'écran
function generateCodeText(nbLines = 44, lineLength = 120) {
  const fakeBase =
    "const ai = createIntelligence(); if(ai.awake()){ ai.scan(); } let brain = neuralNet(); while(brain.active){ analyze(data); } fetch('/api/vision'); data.push(sensor.scan()); for(let i=0;i<100;i++){ run(i); } output = predict(future); function update(v){ return ai.learn(v); }";
  const lines = [];
  for (let i = 0; i < nbLines; i++) {
    const start = (i * 13) % (fakeBase.length - lineLength);
    lines.push(fakeBase.slice(start, start + lineLength));
  }
  return lines.join("\n");
}

export default function CodeLinesOverlay({ scanProgress }) {
  // Responsive : calcule le nombre de lignes selon la hauteur de la fenêtre
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const lineHeightPx = Math.max(Math.round(vh / 40), 18); // ~40 lignes sur l'écran, min 18px
  const nbLines = Math.ceil(vh / lineHeightPx) + 2;
  const codeText = generateCodeText(nbLines, 120);

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        overflow: "hidden",
        fontFamily: "Fira Mono, Menlo, Consolas, monospace",
        userSelect: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <pre
        style={{
          margin: 0,
          padding: 0,
          color: "#18ffe7",
          opacity: 0.16,
          textShadow: "0 0 8px #12f8e655, 0 0 18px #19f6ff33",
          fontSize: "clamp(10px, 2vw, 19px)",
          lineHeight: 1.13,
          letterSpacing: "0.01em",
          background: "none",
          width: "100vw",
          maxWidth: "100vw",
          minWidth: "100vw",
          whiteSpace: "pre",
          transition: "clip-path 0.11s linear",
          clipPath: `inset(0 0 ${100 - scanProgress * 100}% 0)`,
        }}
      >
        {codeText}
      </pre>
    </div>
  );
}
