import React from 'react';
import './Cssfile/Section7.css'; // Ensure the correct path
import backgroundImage from './Pic/Groupe 260.png'; // Adjust the path to your image
import handshake from './Pic/Groupe 264.png'; // Adjust the path to your image

const Section7 = () => {
  return (
    <section className="section7">
      <img src={backgroundImage} alt="Background" className="background-image" />
      <div className="section7-content">
        <h2 className="section7-title">Elles ont pu agir, grâce aux <span className="highlight">PARTENARIATS</span></h2>
        <p className="section7-subtitle">établis dans le cadre du programme Voix et Leadership des Femmes en Tunisie,</p>
        <div className="stats-container">
          <div className="stat">
            <span className="stat-number">21</span>
            <span className="stat-label">Organisations partenaires</span>
          </div>
          <div className="and-symbol">&</div>
          <div className="stat">
            <span className="stat-number">31</span>
            <span className="stat-label">projets partenaires</span>
          </div>
        </div>
        <p className="section7-text dans-gouvernorats">ont mené des actions de changement</p>
        <p className="section7-text ont-mene">dans 13 gouvernorats du pays</p>
        <div className="handshake-container">
          <img src={handshake} alt="Handshake" className="handshake-image" />
        </div>
        <p className="partners-list">
          ATFD, TIGAR, Rayhana, CALAM, CAWTAR,<br />
          ADDCI, SEBIL, AMAL, ATAC,<br />
          Notre Culture d’Abord, etc.
        </p>
      </div>
    </section>
  );
};

export default Section7;
