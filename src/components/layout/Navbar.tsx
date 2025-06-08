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
    const handleScroll = () => setIsOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/60 py-2 px-3`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* --- MOBILE NAVBAR --- */}
      <div className={`max-w-7xl mx-auto flex items-center justify-between lg:hidden`}>
        {/* En RTL, le bloc d'action est à gauche, sinon à droite */}
        <div className={`flex items-center gap-2 ${isRtl ? 'order-2' : 'order-1'}`}>
          {/* En RTL: LangSelector puis burger ; LTR: burger puis LangSelector */}
          {isRtl ? (
            <>
              <LanguageSelector />
              <button
                ref={burgerRef}
                className="text-white focus:outline-none"
                onClick={toggleMenu}
                aria-label={isOpen ? t("closeMenu") : t("openMenu")}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <button
                ref={burgerRef}
                className="text-white focus:outline-none"
                onClick={toggleMenu}
                aria-label={isOpen ? t("closeMenu") : t("openMenu")}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        {/* Filler pour push le bloc d'action au bord */}
        <div className={`flex-1 ${isRtl ? 'order-1' : 'order-2'}`}></div>
      </div>

      {/* --- DESKTOP NAVBAR --- */}
      <div
        className={`max-w-7xl mx-auto items-center hidden lg:flex`}
        style={{
          minHeight: "54px",
        }}
      >
        {/* LIENS NAVBAR */}
        <div className="flex-1 flex items-center">
          <div className="w-full flex justify-between">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-white text-base font-bold hover:text-[#22eaff] transition-colors py-2 px-5 whitespace-nowrap"
                style={{
                  flex: "1 1 0%",
                  textAlign: "center",
                  minWidth: 0,
                }}
                onClick={(e) => handleLinkClick(e, section.id)}
              >
                {t(section.key)}
              </a>
            ))}
          </div>
        </div>

        {/* SELECTEUR LANGUE, coin opposé selon le sens */}
        <div className={isRtl ? "mr-4" : "ml-4"}>
          <LanguageSelector />
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <div
        ref={menuRef}
        className={`transition-all duration-300 ease-in-out lg:hidden ${isOpen ? "block" : "hidden"}`}
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
