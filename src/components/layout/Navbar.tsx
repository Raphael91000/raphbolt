import React, { useState } from "react";
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

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

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

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/60"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/*
        ─── BARRE MOBILE ────────────────────────────────────────────────────────────────
        - En LTR : visible uniquement sous 1024px (lg:hidden).
        - En RTL : visible tout le temps (block).
      */}
      <div
        className={`${
          isRtl ? "block" : "lg:hidden"
        } max-w-7xl mx-auto flex items-center justify-between py-3 px-4`}
      >
        {isRtl ? (
          <>
            {/* RTL = sélecteur à gauche, burger à droite */}
            <LanguageSelector />
            <button
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
            {/* LTR = burger à gauche, sélecteur à droite */}
            <button
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

      {/*
        ─── BARRE DESKTOP ──────────────────────────────────────────────────────────────
        - En LTR : visible à partir de 1024px (hidden lg:flex).
        - En RTL : **toujours masquée** (hidden).
      */}
      <div
        className={`${
          isRtl ? "hidden" : "hidden lg:flex"
        } max-w-7xl mx-auto items-center justify-between py-3 px-4`}
      >
        {/* Liens de navigation */}
        <div className="flex flex-1">
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

      {/*
        ─── MENU DÉROULANT MOBILE ────────────────────────────────────────────────────
        Le menu se déploie sous la barre mobile dès que isOpen === true.
        En RTL : aligné à droite (items-end + text-right).
        En LTR : aligné à gauche (items-start).
      */}
      <div
        className={`${
          isRtl ? "block" : "lg:hidden"
        } transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}
      >
        <div
          className={`flex flex-col gap-2 bg-black/90 px-6 py-4 backdrop-blur-md w-full ${
            isRtl ? "items-end" : "items-start"
          }`}
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`text-white text-lg font-medium hover:text-[#22eaff] py-2 transition-colors ${
                isRtl ? "text-right" : ""
              }`}
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
