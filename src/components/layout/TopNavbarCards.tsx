import React from "react";
import "./TopNavbarCards.css";

const sections = [
  { id: "home", label: "Accueil" },
  { id: "about", label: "À propos de moi" },
  { id: "skills", label: "Compétences" },
  { id: "experiences", label: "Expériences" },
  { id: "projets-perso", label: "Projets Perso" },
  { id: "contact", label: "Contact" },
];

const TopNavbarCards: React.FC = () => {
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.location.hash = id;
    }
  };

  return (
    <nav className="top-navbar-cards">
      {sections.map((section) => (
        <div
          key={section.id}
          className="package"
          onClick={() => handleClick(section.id)}
        >
          <div className="package2">
            <span className="text">{section.label}</span>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default TopNavbarCards;