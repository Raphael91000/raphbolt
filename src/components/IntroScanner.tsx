import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Robot3D from "./Robot3D";

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
