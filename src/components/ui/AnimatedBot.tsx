import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AnimatedBot: React.FC = () => {
  const { t } = useTranslation();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Show message after 2 seconds
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    // Hide message after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowMessage(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-10 flex items-end"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {showMessage && (
        <motion.div
          className="bg-primary text-background-light p-3 rounded-lg mb-2 mr-2 max-w-xs"
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm font-medium">{t('skills.bot')}</p>
          <div className="w-3 h-3 bg-primary absolute bottom-[-6px] right-4 transform rotate-45"></div>
        </motion.div>
      )}

      <motion.div
        className="bg-background-light p-3 rounded-full shadow-lg border border-gray-800"
        animate={{ y: [0, -10, 0] }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
      >
        <Bot size={32} color="#00DCD9" />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedBot;
