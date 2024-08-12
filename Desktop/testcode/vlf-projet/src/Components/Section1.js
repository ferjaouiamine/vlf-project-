import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Cssfile/Section1.css'; // Vérifiez le chemin relatif
import Groupe_135 from './Pic/Groupe 135.png';
import Groupe_138 from './Pic/Groupe 138.png';
import trace_648 from './Pic/Tracé 648.png';
import Groupe_141 from './Pic/Groupe 141.png';

const Section1 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Durée de l'animation
    });
  }, []);

  return (
    <section className="section1">
      <div className="section1-content">
        <h2 className="main-title1" data-aos="fade-up">
          des <span className="highlight1">organisations</span><br/>
          qui ont <span className="highlight-red">RENFORCÉ</span><br/>
          la <span className="highlight-green">voix féministe</span><br/>
          en <span className="highlight-black">Tunisie</span>
        </h2>
        <div className="support-text-container" data-aos="fade-up">
          <span className="dashed-line"></span>
          <div className="circle-behind"></div>
          <p className="support-text">Retrouvez leur voyage à travers les étapes et les impacts du projet VLF et regardez.</p>
        </div>
        <img src={trace_648} alt="Arrow Left" className="arrow-left" data-aos="fade-up" />
        <img src={Groupe_135} alt="Image Étoile" className="etoile" data-aos="fade-right" />
        <img src={Groupe_138} alt="Image Right" className="image-right" data-aos="fade-left" />
        <img src={Groupe_138} alt="Image Left" className="image-left" data-aos="fade-right" />
        <img src={Groupe_141} alt="Arrow Down" className="arrow-down" data-aos="fade-up" />
        <div className="button-container" data-aos="fade-up">
          <a href="#pdf" className="download-button">
            JE TÉLÉCHARGE LE LIVRE D’ART EN PDF
          </a>
        </div>
      </div>
    </section>
  );
};

export default Section1;
