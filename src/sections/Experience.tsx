import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { professionalExperiences } from '../constants/experiences';

const Experience: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="experiences"
      className="py-16 px-4 sm:px-6 lg:px-8" // Supprimé bg-background-dark
      ref={ref}
      style={{ background: "none" }} // Fond transparent pour laisser le canvas de Home dominer si visible
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-white mb-8 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {t('professionalExperiences')}
        </h2>
        {professionalExperiences && professionalExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10 transition-all duration-1000 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">{exp.title} - {exp.company}</h3>
                <p className="text-gray-300">{exp.description} ({exp.period})</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-300">
            {t('experienceSection.professional')} - Section en cours de développement.
          </p>
        )}
      </div>
    </section>
  );
};

export default Experience;