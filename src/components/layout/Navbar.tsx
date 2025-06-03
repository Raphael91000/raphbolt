import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import LanguageSelector from "./LanguageSelector";

const sections = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "experiences", key: "professionalExperiences" },
  { id: "projets-perso", key: "personalProjects" },
  { id: "contact", key: "contact" },
];

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isRtl = i18n.language === 'ar';

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.location.hash = id;
    } else {
      console.error(`Element with id "${id}" not found. Check if <section id="${id}"> exists.`);
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? t('closeMenu') : t('openMenu')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div
          className={`${
            isOpen ? "block translate-y-0 opacity-100" : "hidden translate-y-[-100%] opacity-0"
          } lg:flex lg:items-center justify-between lg:w-full lg:translate-y-0 lg:opacity-100 absolute lg:static top-full ${isRtl ? 'right-0' : 'left-0'} w-full bg-black/80 backdrop-blur-md lg:bg-transparent transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:w-[85%] gap-3 lg:gap-0 py-4 lg:py-0 px-4 lg:px-0">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block lg:inline-block text-white text-sm sm:text-base md:text-base font-medium hover:text-[#22eaff] transition-colors"
                onClick={(e) => handleLinkClick(e, section.id)}
              >
                {t(section.key)}
              </a>
            ))}
          </div>
        </div>

        <div className={`flex items-center h-full ${isRtl ? 'pr-2 sm:pr-3' : 'pl-2 sm:pl-3'}`}>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
