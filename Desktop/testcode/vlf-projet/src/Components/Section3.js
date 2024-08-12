import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Cssfile/Section3.css';
import img3 from './Pic/3.png';
import imgFunds from './Pic/Fonds.png';
import imgFund1 from './Pic/le fonds pluriannuel.png';
import imgFund2 from './Pic/le fonds réactif.png';
import imgFund3 from './Pic/le fonds innovation.png';
import atravers from './Pic/atravers.png';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  useEffect(() => {
    // "À travers" image movement and floating effect
    gsap.fromTo('.atraver-img', 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 2, // Increased duration
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.section3',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
        onComplete: () => {
          gsap.to('.atraver-img', {
            y: '-=10',
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: 'sine.inOut',
          });
        },
      }
    );

    // "3" image rotation
    gsap.fromTo('.number-img',
      { opacity: 0, rotation: -180, scale: 0.5 },
      {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 2, // Increased duration
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.number-img',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        }
      }
    );

    // Arrow zoom effect
    gsap.fromTo('.arrow',
      { scale: 0, opacity: 0 },
      {
        scale: 1.5,
        opacity: 1,
        duration: 2, // Increased duration
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.arrow-container',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
        onComplete: () => {
          gsap.to('.arrow', {
            scale: 1,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: 'sine.inOut',
          });
        },
      }
    );

    // Fund images movement and floating effect
    const fundImages = gsap.utils.toArray('.fund-img');
    fundImages.forEach((image, index) => {
      gsap.fromTo(image,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 2 + index * 1, // Increased duration
          ease: 'power2.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true,
          },
          onComplete: () => {
            gsap.to(image, {
              y: '-=10',
              repeat: -1,
              yoyo: true,
              duration: 2,
              ease: 'sine.inOut',
            });
          },
        }
      );
    });
  }, []);

  return (
    <section className="section3">
      <div className="section3-content">
        <div className="text-left">
          <img src={atravers} alt="À travers" className="atraver-img" />
          <div className="funds-info">
            <img src={img3} alt="3" className="number-img" />
            <img src={imgFunds} alt="fonds" className="funds-img" />
          </div>
        </div>
        <div className="text-right">
          <ul className="funds-list">
            <li className="fund-item">
              <img src={imgFund1} alt="le fonds pluriannuel" className="fund-img" />
            </li>
            <li className="fund-item">
              <img src={imgFund2} alt="le fonds réactif" className="fund-img" />
            </li>
            <li className="fund-item">
              <img src={imgFund3} alt="le fonds innovation" className="fund-img" />
            </li>
          </ul>
        </div>
      </div>
      <div className="arrow-container">
        <span className="arrow">➜</span>
      </div>
      <div className="background-image" />
    </section>
  );
};

export default Section3;
