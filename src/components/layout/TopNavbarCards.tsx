import React from "react";
import { useTranslation } from "react-i18next";
import "./TopNavbarCards.css";

const sections = [
  { id: "home", key: "Accueil" },
  { id: "about", key: "À propos de moi" },
  { id: "skills", key: "Compétences" },
  { id: "experiences", key: "Expériences" },
  { id: "projets-perso", key: "Projets persos" },
  { id: "contact", key: "Contact" },
];

const TopNavbarCards: React.FC = () => {
  // Utilise le scroll smooth vers l’id de section
  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.location.hash = id;
    }
  };

  return (
    <nav className="top-navbar-cards">
      <ul>
        {sections.map((section, i) => (
          <li key={section.id} style={{
            // Dégradé alterné entre orange, rouge, violet (change si tu veux alterné/fusion)
            background: `linear-gradient(120deg, ${i%3===0 ? "#ff69b4" : i%3===1 ? "#ffa500" : "#800080"}, transparent 90%)`
          }}>
            <a
              href={`#${section.id}`}
              onClick={(e) => handleNav(e, section.id)}
              className="navbar-card-link"
            >
              {section.key}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNavbarCards;