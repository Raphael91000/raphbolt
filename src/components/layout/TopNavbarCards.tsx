import React from "react";
import "./TopNavbarCards.css";

const sections = [
  { id: "home", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "skills", label: "Compétences" },
  { id: "experiences", label: "Expériences" },
  { id: "projets-perso", label: "Projets Perso" },
  { id: "contact", label: "Contact" },
];

const TopNavbarCards: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    window.location.hash = id;
  };

  return (
    <nav className="top-navbar-cards"> {/* Changé en top-navbar-cards */}
      {sections.map((section) => (
        <div
          key={section.id}
          className="package"
          onClick={(e) => handleLinkClick(e, section.id)}
          style={{ cursor: "pointer" }}
        >
          <div className="package2">
            <p className="text">{section.label}</p>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default TopNavbarCards;