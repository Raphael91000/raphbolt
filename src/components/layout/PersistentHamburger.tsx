import React, { useState, useEffect } from "react";

const sections = [
  { id: "home", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "skills", label: "Compétences" },
  { id: "experiences", label: "Expériences" },
  { id: "projets-perso", label: "Projets Perso" },
  { id: "contact", label: "Contact" },
];

const PersistentHamburger: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile/tablette (jusqu'à 1024px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLinkClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    window.location.hash = id;
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fermer le menu avec Escape
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

  // Ne pas afficher sur desktop
  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Menu hamburger - TOUJOURS VISIBLE */}
      <div 
        style={{
          position: 'fixed',
          top: '15px',
          left: '15px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          padding: '10px',
          background: 'rgba(0, 0, 0, 0.9)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 105, 180, 0.4)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease',
          pointerEvents: 'auto'
        }}
        onClick={toggleMenu}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.95)';
          e.currentTarget.style.borderColor = 'rgba(255, 105, 180, 0.6)';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 105, 180, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
          e.currentTarget.style.borderColor = 'rgba(255, 105, 180, 0.4)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        }}
      >
        <div 
          style={{
            width: '25px',
            height: '3px',
            background: 'linear-gradient(90deg, #ff69b4, #ffa500, #800080)',
            margin: '3px 0',
            transition: 'all 0.3s ease',
            borderRadius: '2px',
            transform: isMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'
          }}
        />
        <div 
          style={{
            width: '25px',
            height: '3px',
            background: 'linear-gradient(90deg, #ff69b4, #ffa500, #800080)',
            margin: '3px 0',
            transition: 'all 0.3s ease',
            borderRadius: '2px',
            opacity: isMenuOpen ? 0 : 1
          }}
        />
        <div 
          style={{
            width: '25px',
            height: '3px',
            background: 'linear-gradient(90deg, #ff69b4, #ffa500, #800080)',
            margin: '3px 0',
            transition: 'all 0.3s ease',
            borderRadius: '2px',
            transform: isMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
          }}
        />
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 99998,
            pointerEvents: 'auto'
          }}
          onClick={closeMenu}
        />
      )}

      {/* Menu déroulant */}
      {isMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '75px',
            left: '15px',
            background: 'rgba(0, 0, 0, 0.95)',
            borderRadius: '16px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            zIndex: 99999,
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 105, 180, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
            minWidth: '250px',
            maxWidth: '300px',
            pointerEvents: 'auto'
          }}
        >
          {sections.map((section) => (
            <div
              key={section.id}
              style={{
                width: '100%',
                height: '44px',
                borderRadius: '12px',
                background: '#19141d',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '0.5rem',
                transition: 'all 0.25s cubic-bezier(0, 0, 0, 1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => handleLinkClick(section.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 12px 2px rgba(255, 105, 180, 0.4), 0 0 12px 3px rgba(255, 165, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <p style={{
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.01em',
                margin: 0,
                zIndex: 2,
                position: 'relative'
              }}>
                {section.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PersistentHamburger;