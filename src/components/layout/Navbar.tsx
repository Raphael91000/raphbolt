import React, { useState } from "react";
import LanguageSelector from "./LanguageSelector";

const sections = [
  { id: "home", label: "Accueil" },
  { id: "experience", label: "Expériences" },
  { id: "projects", label: "Projets perso" },
  { id: "skills", label: "Compétences" },
  { id: "contact", label: "Contact" },
];

const NAVBAR_BLUE = "#22eaff";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Hamburger Button (visible on mobile, stylé) */}
        <button
          className="lg:hidden text-white focus:outline-none relative"
          onClick={toggleMenu}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          style={{
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = NAVBAR_BLUE;
            e.currentTarget.style.boxShadow = `0 0 10px ${NAVBAR_BLUE}80`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Liens (étalés en desktop, menu déroulant en mobile) */}
        <div
          className={`${
            isOpen ? "block translate-y-0 opacity-100" : "hidden translate-y-[-100%] opacity-0"
          } lg:flex lg:items-center lg:justify-between lg:w-full lg:translate-y-0 lg:opacity-100 absolute lg:static top-full left-0 w-full bg-black/80 backdrop-blur-md lg:bg-transparent transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:w-[85%] gap-3 lg:gap-0 py-4 lg:py-0 px-4 lg:px-0">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block lg:inline-block text-white text-sm sm:text-base md:text-base font-medium transition-colors relative group"
                style={{
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = NAVBAR_BLUE)}
                onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
                onClick={() => setIsOpen(false)}
              >
                {section.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[${NAVBAR_BLUE}] group-hover:w-full transition-all duration-300 lg:duration-200" />
              </a>
            ))}
          </div>
        </div>

        {/* LanguageSelector (fixé en haut à droite, hors menu déroulant) */}
        <div className="flex items-center h-full pl-2 sm:pl-3">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
