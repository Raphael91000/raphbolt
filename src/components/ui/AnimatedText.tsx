import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  
  const texts = [
    t('text.learn'),
    t('text.create'),
    t('text.enterprise'),
    t('text.innovate')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsChanging(false);
      }, 500);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [texts.length]);

  const variants = {
    hidden: { 
      opacity: 0,
      y: -20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className={`relative h-20 flex items-center justify-center ${className}`}>
      <motion.div
        key={currentTextIndex}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="text-4xl font-bold text-primary tracking-wide absolute"
      >
        {texts[currentTextIndex]}
      </motion.div>
    </div>
  );
};

export default AnimatedText;