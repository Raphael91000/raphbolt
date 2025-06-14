import React, { useState, useEffect, useRef } from "react";
import "./SocialButtons.css";

const buttons = [
  {
    className: "github",
    href: "https://github.com/Raphael91000",
    label: "GitHub",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
        <path
          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
        />
      </svg>
    ),
  },
  {
    className: "linkedin",
    href: "https://www.linkedin.com/in/raphael-theuillon-689139261/",
    label: "LinkedIn",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
        />
      </svg>
    ),
  },
  {
    className: "fiverr",
    href: "https://www.fiverr.com/sellers/raph910/edit",
    label: "Fiverr",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M96 32h256c17.7 0 32 14.3 32 32v32H64V64c0-17.7 14.3-32 32-32zm256 96v64H96v-64h256zM64 224v64h192v-64H64zm0 96v64h160v-64H64z"/>
      </svg>
    ),
  },
];

const SocialButtons: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false); // MODIFIÉ : inclut tablette
  const [isHovered, setIsHovered] = useState(false);
  const socialClockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Détecter spécifiquement les iPads et appareils mobiles
      const isIpad = /iPad/.test(navigator.userAgent);
      const isIphone = /iPhone/.test(navigator.userAgent);
      const isAndroidTablet = /Android/.test(navigator.userAgent) && !/Mobile/.test(navigator.userAgent);
      const isAndroidMobile = /Android/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent);
      const isOtherMobile = /webOS|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Critères pour utiliser le système de clic
      const isTrueDevice = isIpad || isIphone || isAndroidTablet || isAndroidMobile || isOtherMobile;
      const isSmallScreen = width <= 1024 && height <= 1400; // Inclut tous les iPads
      
      console.log('SocialButtons - Device detection:', {
        width, height, isIpad, isIphone, isAndroidTablet, 
        shouldUseMobileSystem: isTrueDevice || isSmallScreen
      });
      
      // Utiliser le système de clic pour tous les vrais devices
      setIsMobileOrTablet(isTrueDevice || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Fermer au scroll ET au touch sur mobile/tablette
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileOrTablet && isOpen) {
        setIsOpen(false);
      }
    };

    const handleTouchOutside = (e: TouchEvent) => {
      if (isMobileOrTablet && isOpen && socialClockRef.current && !socialClockRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    // NOUVEAU : Gestion du clic en dehors pour tablette
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileOrTablet && isOpen && socialClockRef.current && !socialClockRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isMobileOrTablet && isOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('touchstart', handleTouchOutside, { passive: true });
      document.addEventListener('click', handleClickOutside); // NOUVEAU pour tablette
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileOrTablet, isOpen]);

  // Gestion des clics sur le bouton trigger
  const handleTriggerClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation(); // NOUVEAU : empêche la propagation
    console.log('Trigger clicked, isMobileOrTablet:', isMobileOrTablet, 'current isOpen:', isOpen); // DEBUG
    if (isMobileOrTablet) {
      setIsOpen(!isOpen);
      console.log('New isOpen state will be:', !isOpen); // DEBUG
    }
  };

  // Gestion du hover sur le trigger (desktop uniquement)
  const handleTriggerHover = (hovered: boolean) => {
    if (!isMobileOrTablet) { // MODIFIÉ : seulement desktop
      setIsHovered(hovered);
    }
  };

  // Gestion du hover sur la liste (pour maintenir ouvert sur desktop)
  const handleListHover = (hovered: boolean) => {
    if (!isMobileOrTablet) { // MODIFIÉ : seulement desktop
      setIsHovered(hovered);
    }
  };

  // Gestion tactile pour les liens sociaux
  const handleSocialClick = (e: React.MouseEvent | React.TouchEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(href, '_blank', 'noopener,noreferrer');
    if (isMobileOrTablet) { // MODIFIÉ : ferme sur mobile ET tablette
      setIsOpen(false);
    }
  };

  return (
    <div 
      className={`social-clock ${isMobileOrTablet && isOpen ? 'mobile-open' : ''}`} // MODIFIÉ : classe pour mobile/tablette
      ref={socialClockRef}
      style={{ 
        marginTop: 0,
        pointerEvents: 'auto'
      }}
    >
      <div 
        className="social-clock__list"
        onMouseEnter={() => handleListHover(true)}
        onMouseLeave={() => handleListHover(false)}
        style={{
          // Style inline pour forcer l'animation
          '--size': (isMobileOrTablet && isOpen) || (!isMobileOrTablet && isHovered) ? '100%' : 'calc(var(--size-button) + var(--size-padding))',
          transform: (isMobileOrTablet && isOpen) || (!isMobileOrTablet && isHovered) ? 'rotate(360deg)' : 'none',
          transition: 'all 0.3s ease-in-out, transform 0.3s linear'
        } as React.CSSProperties}
      >
        {buttons.map((btn, i) => (
          isMobileOrTablet ? ( // MODIFIÉ : div cliquable pour mobile ET tablette
            <div
              key={i}
              className={`social-clock__button ${btn.className}`}
              onClick={(e) => handleSocialClick(e, btn.href)}
              onTouchEnd={(e) => handleSocialClick(e, btn.href)}
              aria-label={btn.label}
              style={{ cursor: 'pointer', touchAction: 'manipulation' }}
            >
              {btn.svg}
            </div>
          ) : ( // Liens normaux pour desktop
            <a
              key={i}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-clock__button ${btn.className}`}
              aria-label={btn.label}
            >
              {btn.svg}
            </a>
          )
        ))}
      </div>
      <button 
        className="social-clock__trigger"
        onClick={handleTriggerClick}
        onTouchEnd={handleTriggerClick}
        onMouseEnter={() => {
          console.log('Mouse enter trigger, isMobileOrTablet:', isMobileOrTablet); // DEBUG
          handleTriggerHover(true);
        }}
        onMouseLeave={() => {
          console.log('Mouse leave trigger, isMobileOrTablet:', isMobileOrTablet); // DEBUG
          handleTriggerHover(false);
        }}
        aria-label={isOpen ? 'Fermer les réseaux sociaux' : 'Ouvrir les réseaux sociaux'}
        style={{ touchAction: 'manipulation' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SocialButtons;