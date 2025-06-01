import React from "react";
import LanguageSelector from "./LanguageSelector";

const sections = [
  { id: "home", label: "Accueil" },
  { id: "experience", label: "Expériences" },
  { id: "projects", label: "Projets perso" },
  { id: "skills", label: "Compétences" },
  { id: "contact", label: "Contact" },
];

const NAVBAR_BLUE = "#22eaff"; // ou la couleur que tu as validée

const NavBar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      {/* Flex global */}
      <div className="max-w-4xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Liens centrés (le mx-auto centre dans le flex global) */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-6">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-white text-base font-medium transition-colors"
                style={{
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
                onMouseOver={e => (e.currentTarget.style.color = NAVBAR_BLUE)}
                onMouseOut={e => (e.currentTarget.style.color = "#fff")}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
        {/* Traducteur parfaitement aligné à droite */}
        <div className="flex items-center h-full pl-6">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
