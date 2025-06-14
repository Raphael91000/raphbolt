import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import ParticleBackground from '../components/layout/ParticleBackground';
import { professionalExperiences } from '../constants/experiences';

// Composant ExperienceCard intégré
interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  title,
  company, 
  period,
  description, 
  index 
}) => {
  return (
    <div className="experience-card-container">
      <div className="experience-card">
        <div className="experience-front-content">
          <div className="experience-company">{company}</div>
          <p className="experience-position">{title}</p>
        </div>
        <div className="experience-content">
          <p className="experience-heading">{company}</p>
          <p className="experience-role">{title}</p>
          <p className="experience-period">{period}</p>
          <p className="experience-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="experiences"
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black"
    >
      {/* Background de particules */}
      <ParticleBackground opacity={0.75} particleCount={45} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-white mb-8 transition-all duration-1000 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {t('professionalExperiences')}
          </h2>
        </div>

        {professionalExperiences && professionalExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {professionalExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`transition-all duration-1000 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <ExperienceCard
                  title={exp.title}
                  company={exp.company}
                  period={exp.period}
                  description={exp.description}
                  index={index}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-300">
              {t('experienceSection.professional')} – Section en cours de développement.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;