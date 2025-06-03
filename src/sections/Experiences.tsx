import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { professionalExperiences } from '../constants/experiences';

const Experiences: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experiences" className="py-20 px-4 md:px-10">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '80px' } : { width: 0 }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-primary mx-auto mb-6"
          />
          <motion.h2
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('experience.professional')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {professionalExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background-light p-6 rounded-lg shadow-lg border border-gray-800"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                <span className="text-sm bg-background/60 px-2 py-1 rounded-full">{exp.period}</span>
              </div>
              <p className="text-lg font-medium mb-3">{exp.company}</p>
              <p className="text-gray-300">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
