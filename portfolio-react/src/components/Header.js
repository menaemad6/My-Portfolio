import React from 'react';
import $ from 'jquery';

const Header = () => {
  const handleNavToggle = () => {
    // First add the modalview class to perspective element
    $('.perspective').addClass('perspective--modalview');
    
    // Add animation class after a short delay
    setTimeout(() => {
      $('.perspective').addClass('effect-rotate-left--animate');
    }, 25);
    
    // Make outer nav and its elements visible all at once
    $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');
  };

  return (
    <header className="header">
      <a className="header--logo" href="#0">
        <img src="assets/img/logo.png" alt="Global" />
        <p>Mena Emad</p>
      </a>
      <button className="header--cta cta">Hire Me</button>
      <div className="header--nav-toggle" onClick={handleNavToggle}>
        <span></span>
      </div>
    </header>
  );
};

export default Header; 