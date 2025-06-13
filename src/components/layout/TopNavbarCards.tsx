import React, { useState, useEffect } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // AJOUT: État pour le marginLeft responsive
  const [navbarMargin, setNavbarMargin] = useState('0px');

  // AJOUT: Fonction pour calculer le margin responsive
  const updateNavbarMargin = () => {
    if (window.innerWidth > 768) {
      setNavbarMargin('80px'); // Aligné avec le texte "Welcome to my"
    } else {
      setNavbarMargin('0px'); // Pas de margin sur mobile
    }
  };

  // AJOUT: Effet pour gérer le responsive
  useEffect(() => {
    // Calcul initial
    updateNavbarMargin();

    // Listener pour le redimensionnement
    const handleResize = () => {
      updateNavbarMargin();
    };

    window.addEventListener('resize', handleResize);

    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    window.location.hash = id;
    
    // Fermer le menu mobile après clic
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fermer le menu avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav 
        className="top-navbar-cards"
        style={{ 
          marginLeft: navbarMargin // CHANGÉ: Utilise l'état dynamique
        }}
      >
        {/* Menu hamburger - en haut à gauche */}
        <div 
          className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>

        {/* Navigation normale - visible sur desktop */}
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

      {/* Overlay pour fermer le menu en cliquant ailleurs */}
      <div 
        className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />

      {/* Menu déroulant mobile */}
      <div className={`mobile-dropdown ${isMenuOpen ? 'open' : ''}`}>
        {sections.map((section) => (
          <div
            key={section.id}
            className="package" // Utilise la même classe que desktop
            onClick={(e) => handleLinkClick(e, section.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="package2">
              <p className="text">{section.label}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopNavbarCards;