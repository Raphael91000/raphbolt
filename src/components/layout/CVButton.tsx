import React from "react";
import "./CVButton.css";

const CVButton: React.FC = () => {
  const handleViewCV = () => {
    const cvUrl = "/CV-Raph-2025.pdf";
    window.open(cvUrl, '_blank');
  };

  return (
    <div className="cv-button-container">
      <div
        className="cv-package"
        onClick={handleViewCV}
        style={{ cursor: "pointer" }}
      >
        <div className="cv-package2">
          <p className="cv-text">Voir mon CV</p>
        </div>
      </div>
    </div>
  );
};

export default CVButton;