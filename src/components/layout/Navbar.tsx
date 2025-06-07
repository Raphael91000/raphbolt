import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const isRtl = i18n.language === "ar";
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.location.hash = id;
    }
    setIsOpen(false);
  };

  // Fermer le menu mobile quand on clique dehors
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/60 ${
        isRtl ? "py-2 px-2" : "py-3 px-4"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Barre mobile */}
      <div
        className={`max-w-7xl mx-auto flex items-center ${
          isRtl ? "flex-row-reverse justify-between" : "justify-between"
        } ${isRtl ? "block" : "lg:hidden"}`}
      >
        {isRtl ? (
          <>
            {/* RTL : Sélecteur à gauche, burger à droite */}
            <LanguageSelector />
            <button
              ref={burgerRef}
              className="text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
          </>
        ) : (
          <>
            {/* LTR : Burger à gauche, sélecteur à droite */}
            <button
              ref={burgerRef}
              className="text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
            <LanguageSelector />
          </>
        )}
      </div>

      {/* Barre desktop */}
      <div
        className={`max-w-7xl mx-auto items-center ${
          isRtl ? "flex flex-row-reverse justify-between" : "hidden lg:flex justify-between"
        } ${isRtl ? "py-2 px-2" : "py-3 px-4"}`}
      >
        {/* Liens de navigation */}
        <div className="flex flex-1 justify-center">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex-1 text-center text-white text-base font-bold hover:text-[#22eaff] transition-colors py-2"
              style={{ minWidth: 0 }}
              onClick={(e) => handleLinkClick(e, section.id)}
            >
              {t(section.key)}
            </a>
          ))}
        </div>
        {/* Sélecteur de langue en desktop */}
        <LanguageSelector />
      </div>

      {/* Menu déroulant mobile */}
      <div
        ref={menuRef}
        className={`transition-all duration-300 ease-in-out ${
          isRtl ? "block" : "lg:hidden"
        } ${isOpen ? "block" : "hidden"}`}
      >
        <div
          className={`flex flex-col gap-2 bg-black/90 px-4 py-3 backdrop-blur-md w-full ${
            isRtl ? "items-end text-right" : "items-start"
          }`}
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`text-white text-lg font-medium hover:text-[#22eaff] py-2 transition-colors`}
              onClick={(e) => handleLinkClick(e, section.id)}
            >
              {t(section.key)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
