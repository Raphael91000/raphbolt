import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Robot3D from "./Robot3D";

// Scan IA ultra fin, full screen
function ScanBackground({ scanProgress }) {
  const top = `calc(${scanProgress * 100}vh - 2px)`;
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Faisceau central fin */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100vw",
          height: "5px", // Ultra fin
          top,
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
          top: `calc(${scanProgress * 100}vh - 9px)`,
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
          top: `calc(${scanProgress * 100}vh - 9px)`,
          background:
            "linear-gradient(180deg, #19f6ffcc 0%, #fff 60%, #19f6ff44 100%)",
          opacity: 0.88,
          borderRadius: "6px 0 0 6px",
        }}
      />
    </div>
  );
}

const IntroScanner = ({ onAccess }) => {
  const [step, setStep] = useState("scan");
  const [scanProgress, setScanProgress] = useState(0);

  // Animation du scan (progression 0 → 1)
  useEffect(() => {
    let animId;
    let start;
    if (step === "scan") {
      const duration = 2200;
      function animateScan(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        setScanProgress(progress);
        if (progress < 1) {
          animId = requestAnimationFrame(animateScan);
        } else {
          setStep("authorized");
        }
      }
      animId = requestAnimationFrame(animateScan);
    }
    return () => cancelAnimationFrame(animId);
  }, [step]);

  useEffect(() => {
    if (step === "authorized") {
      const t = setTimeout(() => setStep("ready"), 1200);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#013C47]">
      {/* Scan IA ultra fin */}
      <ScanBackground scanProgress={scanProgress} />

      {/* Robot 3D animé avec scan */}
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
