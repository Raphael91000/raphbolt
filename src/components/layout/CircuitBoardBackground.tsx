import React, { useRef, useEffect } from "react";

const CYAN = "#22eaff";
const BG = "#0a0f1a";
const LINE_WIDTH = 2;
const TRAIL_LENGTH = 120; // plus = plus long effet lumineux
const SPEED = 1; // plus = plus rapide

// Définition des circuits (tableau de “pistes”)
const CIRCUITS = [
  // 1. Haut-gauche, droite, descend, droite, monte, droite, descend, droite
  [[0,0.14],[0.11,0.14],[0.11,0.22],[0.23,0.22],[0.23,0.12],[0.37,0.12],[0.37,0.24],[0.48,0.24],[0.48,0.18],[0.59,0.18],[0.59,0.28],[0.72,0.28],[0.72,0.21],[0.85,0.21],[0.85,0.36],[1,0.36]],
  // 2. Milieu gauche, monte, droite, descend, droite, monte, droite, descend, droite
  [[0,0.26],[0.13,0.26],[0.13,0.16],[0.21,0.16],[0.21,0.32],[0.32,0.32],[0.32,0.18],[0.45,0.18],[0.45,0.34],[0.61,0.34],[0.61,0.23],[0.74,0.23],[0.74,0.42],[1,0.42]],
  // 3. Bas-gauche, droite, monte, droite, descend, droite, monte, droite, descend, droite
  [[0,0.47],[0.12,0.47],[0.12,0.39],[0.25,0.39],[0.25,0.52],[0.36,0.52],[0.36,0.43],[0.48,0.43],[0.48,0.56],[0.62,0.56],[0.62,0.44],[0.76,0.44],[0.76,0.57],[1,0.57]],
  // 4. Encore plus de zigzags
  [[0,0.61],[0.09,0.61],[0.09,0.7],[0.18,0.7],[0.18,0.55],[0.28,0.55],[0.28,0.67],[0.39,0.67],[0.39,0.60],[0.49,0.60],[0.49,0.69],[0.58,0.69],[0.58,0.61],[0.71,0.61],[0.71,0.74],[1,0.74]],
  // 5. Serpente bien en bas
  [[0,0.83],[0.07,0.83],[0.07,0.91],[0.17,0.91],[0.17,0.79],[0.27,0.79],[0.27,0.88],[0.35,0.88],[0.35,0.81],[0.44,0.81],[0.44,0.93],[0.59,0.93],[0.59,0.84],[0.77,0.84],[0.77,0.91],[1,0.91]],
  // 6. Montée/descente “circuit PCB”
  [[0,0.08],[0.16,0.08],[0.16,0.18],[0.24,0.18],[0.24,0.07],[0.31,0.07],[0.31,0.20],[0.38,0.20],[0.38,0.11],[0.44,0.11],[0.44,0.22],[0.52,0.22],[0.52,0.15],[0.61,0.15],[0.61,0.27],[1,0.27]],
  // 7. Chemin en escalier “compact”
  [[0,0.58],[0.10,0.58],[0.10,0.51],[0.20,0.51],[0.20,0.61],[0.30,0.61],[0.30,0.53],[0.40,0.53],[0.40,0.65],[0.55,0.65],[0.55,0.57],[0.70,0.57],[0.70,0.69],[1,0.69]],
];



  // Tu peux en rajouter facilement pour complexifier le circuit !


const CircuitBoardBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", handleResize);

    // Pour chaque piste, une “lumière” qui se déplace
    const lightStates = CIRCUITS.map(() => ({
      t: Math.random() * 1, // position 0..1 (aléatoire au départ)
      dir: Math.random() > 0.5 ? 1 : -1, // direction
    }));

    function drawCircuit() {
      ctx.clearRect(0, 0, width, height);

      // Fond “hardware”
      ctx.save();
      ctx.fillStyle = BG;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Pistes “circuit” (sombres + glow cyan)
      CIRCUITS.forEach((points, idx) => {
        // Piste sombre
        ctx.save();
        ctx.beginPath();
        points.forEach(([x, y], i) => {
          const px = x * width, py = y * height;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.strokeStyle = "#193a46";
        ctx.lineWidth = LINE_WIDTH + 2;
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.54;
        ctx.stroke();
        ctx.restore();

        // Glow cyan sur la piste
        ctx.save();
        ctx.beginPath();
        points.forEach(([x, y], i) => {
          const px = x * width, py = y * height;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.strokeStyle = CYAN;
        ctx.lineWidth = LINE_WIDTH;
        ctx.shadowColor = CYAN;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = 0.18;
        ctx.stroke();
        ctx.restore();
      });

      // Animation de la lumière qui circule sur chaque piste
      CIRCUITS.forEach((points, idx) => {
        // Récupère l’état du “photon”
        let { t, dir } = lightStates[idx];
        // Calcule la position exacte sur la piste
        // (lerp chaque segment)
        let totalLen = 0;
        const segLens = [];
        for (let i = 1; i < points.length; i++) {
          const [x0, y0] = points[i-1], [x1, y1] = points[i];
          const len = Math.hypot((x1-x0)*width, (y1-y0)*height);
          segLens.push(len);
          totalLen += len;
        }
        let curLen = t * totalLen;
        let found = false;
        let px = points[0][0] * width, py = points[0][1] * height;
        for (let i = 1; i < points.length && !found; i++) {
          if (curLen > segLens[i-1]) {
            curLen -= segLens[i-1];
          } else {
            // Interpolation linéaire sur le segment i-1 -> i
            const [x0, y0] = points[i-1], [x1, y1] = points[i];
            const r = curLen / segLens[i-1];
            px = (x0 + (x1 - x0) * r) * width;
            py = (y0 + (y1 - y0) * r) * height;
            found = true;
          }
        }
        // Trace le “photon” lumineux avec un petit trailing
        for (let s = 0; s < TRAIL_LENGTH; s += 10) {
          let trailLen = t * totalLen - s * dir * 0.8;
          let trailFound = false, tx = points[0][0] * width, ty = points[0][1] * height;
          let trailCur = trailLen;
          for (let i = 1; i < points.length && !trailFound; i++) {
            if (trailCur > segLens[i-1]) {
              trailCur -= segLens[i-1];
            } else {
              const [x0, y0] = points[i-1], [x1, y1] = points[i];
              const r = trailCur / segLens[i-1];
              tx = (x0 + (x1 - x0) * r) * width;
              ty = (y0 + (y1 - y0) * r) * height;
              trailFound = true;
            }
          }
          ctx.save();
          ctx.beginPath();
          ctx.arc(tx, ty, 6-s*0.04, 0, 2 * Math.PI);
          ctx.fillStyle = CYAN;
          ctx.globalAlpha = Math.max(0, 0.24 - s/TRAIL_LENGTH*0.22);
          ctx.shadowColor = CYAN;
          ctx.shadowBlur = 18-s*0.09;
          ctx.fill();
          ctx.restore();
        }
      });
    }

    function animate() {
      // Avance les lumières sur chaque circuit
      CIRCUITS.forEach((_, idx) => {
        lightStates[idx].t += SPEED * 0.004 * lightStates[idx].dir;
        if (lightStates[idx].t > 1) {
          lightStates[idx].t = 1;
          lightStates[idx].dir = -1;
        } else if (lightStates[idx].t < 0) {
          lightStates[idx].t = 0;
          lightStates[idx].dir = 1;
        }
      });
      drawCircuit();
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default CircuitBoardBackground;
