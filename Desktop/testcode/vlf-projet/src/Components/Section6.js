import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Cssfile/Section6.css'; // Ensure the path to your CSS file is correct

// Import the necessary images
import backgroundImage from './Pic/GettyImages-1016194666-3.png';
import questionMarkImage from './Pic/élément1jaunne.png';
import starImage from './Pic/starpetit.png';
import flowerImage from './Pic/Groupe 67.png';
import titleCommentImage from './Pic/Comment.png';
import titleEllesOntImage from './Pic/elles ont.png';
import titleFaitEvoluerImage from './Pic/fait évoluer la Tunisie.png';
import descriptions1s6Image from './Pic/description1s6.png';
import descriptions2s6Image from './Pic/descriptions2s6.png';

gsap.registerPlugin(ScrollTrigger);

const Section6 = () => {
  useEffect(() => {
    // Animations for title images with rotation and stagger
    gsap.fromTo('.comment-title', 
      { opacity: 0, y: -100, rotation: -10 }, 
      { opacity: 1, y: 0, rotation: 0, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: '.section6', start: 'top 80%', end: 'bottom 60%', scrub: true }, stagger: 0.2 }
    );

    gsap.fromTo('.ellesont-title', 
      { opacity: 0, y: -100, rotation: -10 }, 
      { opacity: 1, y: 0, rotation: 0, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: '.section6', start: 'top 80%', end: 'bottom 60%', scrub: true }, stagger: 0.3 }
    );

    gsap.fromTo('.tunisie-title', 
      { opacity: 0, y: -100, rotation: -10 }, 
      { opacity: 1, y: 0, rotation: 0, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: '.section6', start: 'top 80%', end: 'bottom 60%', scrub: true }, stagger: 0.4 }
    );

    // Animation for the question mark with rotation
    gsap.fromTo('.question-mark-section6', 
      { opacity: 0, scale: 0.8, rotation: 180 }, 
      { opacity: 1, scale: 1, rotation: 0, duration: 3, ease: 'power3.out', scrollTrigger: { trigger: '.section6', start: 'top 70%', end: 'bottom 60%', scrub: true } }
    );

    // Animations for description images with slight movement
    gsap.fromTo('.description1', 
      { opacity: 0, x: -100 }, 
      { opacity: 1, x: 0, duration: 2.5, ease: 'power3.out', scrollTrigger: { trigger: '.section6', start: 'top 60%', end: 'bottom 50%', scrub: true } }
    );

    gsap.fromTo('.description2', 
      { opacity: 0, x: 100 }, 
      { opacity: 1, x: 0, duration: 2.5, ease: 'power3.out', scrollTrigger: { trigger: '.section6', start: 'top 60%', end: 'bottom 50%', scrub: true } }
    );

    // Animations for decorative elements with rotation
    gsap.fromTo('.star', 
      { opacity: 0, scale: 0.8, rotation: -45 }, 
      { opacity: 1, scale: 1, rotation: 0, duration: 3, ease: 'power3.out', scrollTrigger: { trigger: '.section6', start: 'top 70%', end: 'bottom 60%', scrub: true } }
    );

    gsap.fromTo('.flower', 
      { opacity: 0, scale: 0.8, rotation: 45 }, 
      { opacity: 1, scale: 1, rotation: 0, duration: 3, ease: 'power3.out', scrollTrigger: { trigger: '.section6', start: 'top 70%', end: 'bottom 60%', scrub: true } }
    );
  }, []);

  return (
    <section className="section6">
      <div className="background-image-container">
        <img src={backgroundImage} alt="Background" className="background-image" />
      </div>
      <div className="section6-content">
        <div className="title-container">
          <img src={titleCommentImage} alt="Comment" className="comment-title" />
          <img src={titleEllesOntImage} alt="Elles Ont" className="ellesont-title" />
          <img src={titleFaitEvoluerImage} alt="Fait Evoluer la Tunisie" className="tunisie-title" />
          <img src={questionMarkImage} alt="Question Mark" className="question-mark-section6" />
        </div>
        <div className="description-container">
          <img src={descriptions1s6Image} alt="Description 1" className="description1" />
          <img src={descriptions2s6Image} alt="Description 2" className="description2" />
        </div>
        <div className="decoration-container">
          <img src={starImage} alt="Star" className="star" />
          <img src={flowerImage} alt="Flower" className="flower" />
        </div>
      </div>
    </section>
  );
};

export default Section6;
