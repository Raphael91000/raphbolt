import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import ParticleBackground from '../components/layout/ParticleBackground';
import { personalProjects } from '../constants/experiences';

const PersonalProjects: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="projets-perso"
      ref={ref}
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-black"
    >
      {/* Background de particules */}
      <ParticleBackground opacity={0.65} />
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-white mb-8 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {t('personalProjects')}
        </h2>
        {personalProjects && personalProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.map((project, index) => (
              <div
                key={project.id}
                className={`bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/10 transition-all duration-1000 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title} - {project.company}
                </h3>
                <p className="text-gray-300">
                  {project.description} <span className="opacity-70">({project.period})</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-300">
            {t('experienceSection.personal')} – Section en cours de développement.
          </p>
        )}
      </div>
    </section>
  );
};

export default PersonalProjects;