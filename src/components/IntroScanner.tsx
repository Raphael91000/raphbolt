import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Robot3D from './Robot3D';

type IntroScannerProps = {
  onAccess: () => void;
};

const IntroScanner: React.FC<IntroScannerProps> = ({ onAccess }) => {
  const [step, setStep] = useState<"scan" | "authorized" | "ready">("scan");

  useEffect(() => {
    // Lance l’animation du scan, puis passe à l’état "authorized", puis "ready"
    const timers = [
      setTimeout(() => setStep("authorized"), 2500),  // scan terminé
      setTimeout(() => setStep("ready"), 4000),       // bouton apparaît
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#013C47]">
      <div className="w-80 h-80 relative flex items-center justify-center">
        <Robot3D />
        {/* Effet scanner */}
        <AnimatePresence>
          {step === "scan" && (
            <motion.div
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: '85%', opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="absolute left-1/2 -translate-x-1/2 w-52 h-5 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, rgba(32,224,255,0.6), rgba(255,255,255,0.85), rgba(32,224,255,0.6))",
                borderRadius: "999px",
                filter: "blur(1px) brightness(1.2)",
                boxShadow: "0 0 28px 10px #10B5C4, 0 2px 12px #fff4",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Message Access authorized */}
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

      {/* Bouton d’accès */}
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
