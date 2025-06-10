import React from "react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center min-h-[100vh] py-20 px-4 overflow-hidden bg-black"
      // Si tu veux un petit effet de lumière subtile : remplace bg-black par bg-gradient-to-b from-black via-[#0c1929] to-[#1a334a]
    >
      <div className="relative z-20 pt-[36vh] pb-8 flex flex-col items-center">
        <h2 className="text-5xl font-bold mb-7 text-white text-center drop-shadow-lg">
          {t("aboutSection.title")}
        </h2>
        <p
          className="text-lg md:text-xl leading-relaxed text-white max-w-3xl text-center"
          style={{ textShadow: "0 2px 16px #003e6b44" }}
        >
          {t("aboutSection.description")}
        </p>
      </div>
    </section>
  );
};

export default About;