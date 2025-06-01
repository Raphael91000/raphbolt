import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { professionalExperiences, personalProjects } from '../constants/experiences';

const Experience: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'professional' | 'personal'>('professional');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section id="experience" className="py-20 px-4 md:px-10">
      <div 
        ref={ref}
        className="max-w-6xl mx-auto"
      >
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
            {t('experience.title')}
          </motion.h2>
        </div>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-background-light rounded-lg">
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'professional' 
                  ? 'bg-primary text-background' 
                  : 'text-white'
              }`}
              onClick={() => setActiveTab('professional')}
            >
              {t('experience.professional')}
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'personal' 
                  ? 'bg-primary text-background' 
                  : 'text-white'
              }`}
              onClick={() => setActiveTab('personal')}
            >
              {t('experience.personal')}
            </button>
          </div>
        </div>
        
        <div className="relative">
          <motion.div 
            className={`${activeTab === 'professional' ? 'block' : 'hidden'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
          
          <motion.div 
            className={`${activeTab === 'personal' ? 'block' : 'hidden'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
                    <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                    <span className="text-sm bg-background/60 px-2 py-1 rounded-full">{project.period}</span>
                  </div>
                  <p className="text-lg font-medium mb-3">{project.company}</p>
                  <p className="text-gray-300">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;