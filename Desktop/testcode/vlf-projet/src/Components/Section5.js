import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Cssfile/Section5.css'; 

// Import the necessary images
import starImage1 from './Pic/star1.png'; 
import starImage2 from './Pic/star2.png'; 
import backgroundImageRight from './Pic/123.png'; 
import fondjaunne from './Pic/fondjaune.png'; 

import fondPluriannuelImage from './Pic/Fonds Pluriannuel.png'; 
import fondReacitifImage from './Pic/Fonds Réactif.png'; 
import fondInnovationImage from './Pic/Fonds Innovation.png'; 

import description1Image from './Pic/description1.png'; 
import description2Image from './Pic/description2.png'; 
import description3Image from './Pic/description3.png'; 


gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
  useEffect(() => {
    gsap.fromTo('.funds-item', 
      { opacity: 0, y: 50 }, 
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.section5-content',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );

    gsap.fromTo('.background-image-right', 
      { scale: 1 }, 
      { 
        scale: 2.5,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.section5',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="section5">
      <div className="background-container">
        <img src={starImage1} alt="Star 1" className="star-image star1" />
        <img src={starImage2} alt="Star 2" className="star-image star2" />
        <img src={backgroundImageRight} alt="Background Right" className="background-image-right" />
      </div>
      <div className="section5-content">
        <div className="funds-item">
        <img src={fondjaunne} alt="fondjaune" className="fondjaune" />

          <img src={fondPluriannuelImage} alt="Fonds Pluriannuel" className="funds-title-image" />
          <img src={description1Image} alt="Description 1" className="funds-description-image" />
        </div>

        <div className="funds-item">
          <img src={fondReacitifImage} alt="Fonds Réactif" className="funds-title-image" />
          <img src={description2Image} alt="Description 2" className="funds-description-image" />
        </div>

        <div className="funds-item">
          <img src={fondInnovationImage} alt="Fonds Innovation" className="funds-title-image" />
          <img src={description3Image} alt="Description 3" className="funds-description-image" />
        </div>
      </div>
    </section>
  );
};

export default Section5;
