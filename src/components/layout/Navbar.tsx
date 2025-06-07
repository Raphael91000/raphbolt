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
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/60 py-3 px-2" dir={isRtl ? "rtl" : "ltr"}>
      <div className="relative max-w-7xl mx-auto flex items-center h-12 lg:h-16">
        {/* Globe */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 ${isRtl ? "left-2" : "right-2"} z-20`}
        >
          <LanguageSelector />
        </div>

        {/* Menu burger mobile */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 ${isRtl ? "right-2" : "left-2"} z-20 lg:hidden`}
        >
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
        </div>

        {/* Liens (desktop uniquement, espacés et décalés) */}
        <div className="flex-1 flex justify-center">
          <div className={`hidden lg:flex gap-14 justify-center ${isRtl ? "pl-24" : "pr-24"}`}>
            {(isRtl ? sections.slice().reverse() : sections).map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-white text-base font-bold hover:text-[#22eaff] transition-colors py-2 px-6 text-center"
                style={{ minWidth: 0 }}
                onClick={(e) => handleLinkClick(e, section.id)}
              >
                {t(section.key)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Menu déroulant mobile */}
      <div className={`transition-all duration-300 ease-in-out lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div
          className={`flex flex-col gap-2 bg-black/90 px-4 py-3 backdrop-blur-md w-full mt-2 ${
            isRtl ? "items-end text-right" : "items-start"
          }`}
        >
          {(isRtl ? sections.slice().reverse() : sections).map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-white text-lg font-medium hover:text-[#22eaff] py-2 transition-colors"
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
