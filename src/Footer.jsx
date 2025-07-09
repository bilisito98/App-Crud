import React, { useState } from "react";
import "./Footer.css";

function Footer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <footer className="footer">
        <span>© 2025 | All Rights Reserved | Developed with <span style={{color: "#ff5722"}}>♥</span> by Developer | </span>
        <span
          className="footer-team"
          onClick={() => setShowModal(true)}
          tabIndex={0}
          role="button"
        >
          team: "william"
        </span>
      </footer>
      {showModal && (
        <div className="footer-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="footer-modal" onClick={e => e.stopPropagation()}>
            <div className="footer-modal-content">
              <img
                src="/src/Neo.jpeg"
                alt="Foto de perfil"
                className="footer-profile-img"
              />
              <h3>William David Vargas</h3>
              <p>Líder<br />Fullstack Developer</p>
              <button className="footer-modal-close" onClick={() => setShowModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
