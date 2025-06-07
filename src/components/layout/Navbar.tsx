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
  const isRtl = i18n.dir(i18n.language) === "rtl";

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
      className={`fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/60 py-2 px-2`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Barre mobile */}
      <div className={`max-w-7xl mx-auto flex items-center justify-between lg:hidden`}>
        {isRtl ? (
          <>
            <LanguageSelector />
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </>
        ) : (
          <>
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <LanguageSelector />
          </>
        )}
      </div>

      {/* Barre desktop */}
      <div
        className={`max-w-7xl mx-auto items-center hidden lg:flex ${isRtl ? "flex-row-reverse" : "flex-row"} justify-between py-2 px-2`}
      >
        {/* Sélecteur de langue */}
        {isRtl ? (
          <>
            <LanguageSelector />
            <div className="flex flex-1 justify-center">
              {sections.slice().reverse().map((section) => (
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
          </>
        ) : (
          <>
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
            <LanguageSelector />
          </>
        )}
      </div>

      {/* Menu déroulant mobile */}
      <div className={`transition-all duration-300 ease-in-out lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div
          className={`flex flex-col gap-2 bg-black/90 px-4 py-3 backdrop-blur-md w-full ${
            isRtl ? "items-end text-right" : "items-start"
          }`}
        >
          {(isRtl ? sections.slice().reverse() : sections).map((section) => (
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
