import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section id="about" className="flex items-center justify-center py-20 px-4 md:px-10">
      <motion.div 
        ref={ref}
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '80px' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-primary mx-auto mb-6"
          />
          <motion.h2 
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('about.title')}
          </motion.h2>
        </div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <motion.div 
              className="w-56 h-56 rounded-full overflow-hidden border-4 border-primary"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/4098157/pexels-photo-4098157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Raphael Theuillon"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          
          <motion.div 
            className="md:col-span-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-lg leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;