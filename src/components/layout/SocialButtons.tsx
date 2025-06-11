import React from "react";
import "./SocialButtons.css";

const SocialButtons: React.FC = () => {
  return (
    <div className="card">
      <div className="background"></div>
      <div className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.667 31.69" className="logo-svg">
          <path id="Path_6" data-name="Path 6" d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" transform="translate(0 0)"></path>
          <path id="Path_7" data-name="Path 7" d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z" transform="translate(-45.91 0)"></path>
          <path id="Path_8" data-name="Path 8" d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z" transform="translate(0 -51.963)"></path>
        </svg>
      </div>
      <div className="box box1">
        <a href="https://github.com/Raphael91000" target="_blank" rel="noopener noreferrer" className="icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </a>
      </div>
      <div className="box box2">
        <a href="https://www.linkedin.com/in/raphael-theuillon-689139261/" target="_blank" rel="noopener noreferrer" className="icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.637-.557-2.756-1.954-2.756-1.065 0-1.698.715-1.698 1.617 0 .875.583 1.604 1.433 1.604h.032l-.001 5.139h-3v-11h2.987v1.437h.043c.416-.787 1.428-1.617 2.933-1.617 3.141 0 3.711 2.066 3.711 4.751v5.429z"/>
          </svg>
        </a>
      </div>
      <div className="box box3">
        <a href="https://www.fiverr.com/sellers/raph910/edit" target="_blank" rel="noopener noreferrer" className="icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </a>
      </div>
      <div className="box box4"></div>
    </div>
  );
};

export default SocialButtons;