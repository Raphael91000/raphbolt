import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalProjects } from '../constants/experiences';

const PersonalProjects: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projets-perso" className="py-20 px-4 md:px-10">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('experience.personal')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {personalProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background-light p-6 rounded-lg shadow-lg border border-gray-800"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#22eaff]">{project.title}</h3>
                <span className="text-sm bg-background/60 px-2 py-1 rounded-full">{project.period}</span>
              </div>
              <p className="text-lg font-medium mb-3">{project.company}</p>
              <p className="text-gray-300">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjects;
