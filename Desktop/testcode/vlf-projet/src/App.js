import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css'; 
import HeaderSection from './Components/Header';
import Section1 from './Components/Section1';
import Section2 from './Components/Section2';
import Section3 from './Components/Section3';
import Section4 from './Components/Section4';
import Section5 from './Components/Section5';
import Navbar from './Components/Navbar';
import Section6 from './Components/Section6';
import Section7 from './Components/Section7';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    gsap.fromTo('.header-section', 
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.header-section',
          start: 'top top',
          end: 'bottom top',
          scrub: false,
        },
      }
    );

    gsap.fromTo('.section1',
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.section1',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );

    gsap.fromTo('.section2',
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.section2',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );

    gsap.fromTo('.section3',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 2,  // Augmente la durée pour ralentir un peu l'entrée
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.section3',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );

    gsap.fromTo('.section4',
      { opacity: 0, y: -100 },
      {
        opacity: 1,
        y: 0,
        duration: 2,  // Augmente la durée pour ralentir un peu l'entrée
        delay: 0.5,   // Ajoute un léger délai pour séparer les animations
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.section4',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );

    gsap.fromTo('.section5',
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
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
    <div className="vlf-page-container">
      <Navbar />
      <HeaderSection />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6/>
      {/* <Section7/> */}
    </div>
  );
};

export default App;
