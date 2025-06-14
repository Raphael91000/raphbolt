import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import ParticleBackground from '../components/layout/ParticleBackground';
import { personalProjects } from '../constants/experiences';

// Composant ProjectCard intégré
interface ProjectCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title,
  company,
  period,
  description,
  index 
}) => {
  return (
    <div className="project-card-container">
      <div className="project-card">
        <div className="project-front-content">
          <div className="project-icon">🚀</div>
          <p className="project-name">{title}</p>
        </div>
        <div className="project-content">
          <p className="project-heading">{title}</p>
          <p className="project-description">{description}</p>
          <div className="project-tech">
            <span className="tech-label">Projet:</span>
            <div className="tech-list">{company}</div>
          </div>
          <div className="project-period">
            <span className="period-label">Période: {period}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

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
            {t('personalProjects')}
          </h2>
        </div>

        {personalProjects && personalProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {personalProjects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-1000 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <ProjectCard
                  title={project.title}
                  company={project.company}
                  period={project.period}
                  description={project.description}
                  index={index}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-300">
              {t('experienceSection.personal')} – Section en cours de développement.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonalProjects;