import React from 'react';
import HomeSection from './sections/HomeSection';
import WorksSection from './sections/WorksSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import HireMeSection from './sections/HireMeSection';

const MainContent = () => {
  return (
    <ul className="l-main-content main-content">
      <li className="l-section section section--is-active">
        <HomeSection />
      </li>
      <li className="l-section section">
        <WorksSection />
      </li>
      <li className="l-section section">
        <AboutSection />
      </li>
      <li className="l-section section">
        <ContactSection />
      </li>
      <li className="l-section section">
        <HireMeSection />
      </li>
    </ul>
  );
};

export default MainContent; 