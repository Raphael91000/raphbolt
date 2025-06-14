import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TopNavbarCards from "./components/layout/TopNavbarCards";
import PersistentHamburger from "./components/layout/PersistentHamburger";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import PersonalProjects from "./sections/PersonalProjects";
import Contact from "./sections/Contact";
import "./lib/i18n";

function App() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [isRtl]);

  useEffect(() => {
    document.title = t("app.title");
  }, [t]);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "none" }}>
      {/* Navbar horizontale en haut - VISIBLE SUR DESKTOP */}
      <TopNavbarCards />
      
      {/* Menu hamburger persistant - VISIBLE SUR MOBILE/TABLETTE UNIQUEMENT */}
      <PersistentHamburger />
      
      {/* CORRIGÉ: Padding-top SEULEMENT sur desktop + z-index pour éviter les conflits */}
      <main className="sm:pt-[74px] pt-0 relative z-0">
        <Home />
        <About />
        <Skills />
        <Experience />
        <PersonalProjects />
        <Contact />
      </main>
      
      <footer className="py-6 px-4 text-center text-sm text-gray-400 z-10 relative">
        <p>© {new Date().getFullYear()} Raphael Theuillon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;