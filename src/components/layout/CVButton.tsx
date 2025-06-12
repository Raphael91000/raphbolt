import React from "react";
import "./CVButton.css";

const CVButton: React.FC = () => {
  const handleDownload = () => {
    // Remplacez par le lien vers votre CV
    const cvUrl = "/path/to/your/CV-Raph_2025.pdf"; // Changez ce chemin
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "CV_Raphael_Theuillon.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="cv-button-container">
      <div
        className="cv-package"
        onClick={handleDownload}
        style={{ cursor: "pointer" }}
      >
        <div className="cv-package2">
          <p className="cv-text">Téléchargez mon CV</p>
        </div>
      </div>
    </div>
  );
};

export default CVButton;