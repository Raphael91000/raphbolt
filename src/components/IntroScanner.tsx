import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Robot3D from "./Robot3D";
import CodeLinesOverlay from "./CodeLinesOverlay";

function ScanBackground({ scanProgress }) {
  const top = scanProgress * 100;
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      {/* Faisceau central fin */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100vw",
          height: "5px",
          top: `calc(${top}vh - 2px)`,
          background:
            "linear-gradient(90deg, transparent 0%, #19f6ffcc 45%, #fff 50%, #19f6ffcc 55%, transparent 100%)",
          opacity: 0.92,
          borderRadius: "2px",
        }}
      />
      {/* Réticule latéral gauche fin */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "10px",
          height: "18px",
          top: `calc(${top}vh - 9px)`,
          background:
            "linear-gradient(180deg, #19f6ffcc 0%, #fff 60%, #19f6ff44 100%)",
          opacity: 0.88,
          borderRadius: "0 6px 6px 0",
        }}
      />
      {/* Réticule latéral droit fin */}
      <div
        style={{
          position: "absolute",
          right: 0,
          width: "10px",
          height: "18px",
          top: `calc(${top}vh - 9px)`,
          background:
            "linear-gradient(180deg, #19f6ffcc 0%, #fff 60%, #19f6ff44 100%)",
          opacity: 0.88,
          borderRadius: "6px 0 0 6px",
        }}
      />
    </div>
  );
}

const FACE_ZONE_START = 0.38;
const FACE_ZONE_END = 0.62;

const IntroScanner = ({ onAccess }) => {
  const [step, setStep] = useState("scan");
  const [scanProgress, setScanProgress] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    function animateScan(tsStart) {
      const durationFast = 900;
      const durationSlow = 1400;

      let phase = 0;
      let start = tsStart;

      function stepAnim(ts) {
        let t = ts - start;
        let progress = 0;

        if (phase === 0) {
          if (t < durationFast) {
            progress = (t / durationFast) * FACE_ZONE_START;
            setScanProgress(progress);
            rafRef.current = requestAnimationFrame(stepAnim);
          } else {
            phase = 1;
            start = ts;
            setScanProgress(FACE_ZONE_START);
            rafRef.current = requestAnimationFrame(stepAnim);
          }
        } else if (phase === 1) {
          if (t < durationSlow) {
            const progressOnFace = (t / durationSlow) * (FACE_ZONE_END - FACE_ZONE_START);
            progress = FACE_ZONE_START + progressOnFace;
            setScanProgress(progress);
            rafRef.current = requestAnimationFrame(stepAnim);
          } else {
            phase = 2;
            start = ts;
            setScanProgress(FACE_ZONE_END);
            rafRef.current = requestAnimationFrame(stepAnim);
          }
        } else if (phase === 2) {
          if (t < durationFast) {
            const progressEnd = (t / durationFast) * (1 - FACE_ZONE_END);
            progress = FACE_ZONE_END + progressEnd;
            setScanProgress(progress);
            rafRef.current = requestAnimationFrame(stepAnim);
          } else {
            setScanProgress(1);
            setStep("authorized");
          }
        }
      }

      rafRef.current = requestAnimationFrame(stepAnim);
    }

    if (step === "scan") {
      setScanProgress(0);
      rafRef.current = requestAnimationFrame(animateScan);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [step]);

  useEffect(() => {
    if (step === "authorized") {
      const t = setTimeout(() => setStep("ready"), 1200);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#013C47]">
      {/* Code lines responsive en fond */}
      <CodeLinesOverlay scanProgress={scanProgress} />

      {/* Scan et robot */}
      <ScanBackground scanProgress={scanProgress} />
      <div className="w-80 h-80 relative flex items-center justify-center z-10">
        <Robot3D scanProgress={scanProgress} />
      </div>

      {/* Texte & bouton */}
      <AnimatePresence>
        {step !== "scan" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-8 text-2xl text-green-400 font-mono tracking-widest shadow-sm"
          >
            Access authorized
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === "ready" && (
          <motion.button
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-10 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-green-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all"
            onClick={onAccess}
            autoFocus
          >
            Accédez à mon portfolio
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroScanner;
