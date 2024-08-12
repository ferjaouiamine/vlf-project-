import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Cssfile/Section4.css';
import backgroundImage from './Pic/Rectangle 170.png'; 
import durationImage from './Pic/Groupe 160.png'; 
import hourglassImage from './Pic/Groupe 162.png'; 
import handImage from './Pic/Groupe 164.png';
import r3adImage from './Pic/r3ad.png'; // New image import
import cotetImage from './Pic/cotet.png'; // New image import

gsap.registerPlugin(ScrollTrigger);

const Section4 = () => {
  useEffect(() => {
    gsap.fromTo('.section4 .duration-image', 
      { y: '100%', opacity: 0 }, 
      {
        y: '0%', 
        opacity: 1, 
        ease: 'power3.out', 
        duration: 1.5, 
        scrollTrigger: {
          trigger: '.section4',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );

    gsap.fromTo('.section4 .hourglass-image', 
      { x: '-100%', opacity: 0 }, 
      {
        x: '0%', 
        opacity: 1, 
        ease: 'power3.out', 
        duration: 1.5, 
        scrollTrigger: {
          trigger: '.section4',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );

    gsap.fromTo('.section4 .hand-image', 
      { x: '100%', y: '-100%', opacity: 0 }, 
      {
        x: '0%', 
        y: '0%',
        opacity: 1, 
        ease: 'power3.out', 
        duration: 2, 
        scrollTrigger: {
          trigger: '.section4',
          start: 'top 60%',
          end: 'bottom 50%',
          scrub: true,
        },
      }
    );

    // Animation for new images
    gsap.fromTo('.section4 .r3ad-image', 
      { x: '-100%', opacity: 0 }, 
      {
        x: '0%', 
        opacity: 1, 
        ease: 'power3.out', 
        duration: 2, 
        scrollTrigger: {
          trigger: '.section4',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );

    gsap.fromTo('.section4 .cotet-image', 
      { y: '-100%', opacity: 0 }, 
      {
        y: '0%', 
        opacity: 1, 
        ease: 'power3.out', 
        duration: 2, 
        scrollTrigger: {
          trigger: '.section4',
          start: 'top 60%',
          end: 'bottom 50%',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="section4">
      <div className="background-container">
        <img src={backgroundImage} alt="Background" className="background-image" />
      </div>
      <div className="duration-objective-container">
        <img src={durationImage} alt="Hourglass" className="hourglass-image" />
        <img src={hourglassImage} alt="duration" className="duration-image" />
        <img src={handImage} alt="Hand" className="hand-image" />
        <img src={r3adImage} alt="R3ad" className="r3ad-image" /> {/* New Image */}
        <img src={cotetImage} alt="Cotet" className="cotet-image" /> {/* New Image */}
      </div>
    </section>
  );
};

export default Section4;
