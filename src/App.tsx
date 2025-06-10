import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./components/layout/Navbar";
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

  // Met à jour le sens d’écriture (RTL/LTR)
  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language || "fr";
  }, [isRtl, i18n.language]);

  // Met à jour le titre de la page
  useEffect(() => {
    document.title = t("app.title");
  }, [t]);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "none" }}>
      <Navbar />
      <main>
        {/* Home uniquement : animation canvas */}
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