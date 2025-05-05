import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <a className="header--logo" href="#0">
        <img src="assets/img/logo.png" alt="Global" />
        <p>Mena Emad</p>
      </a>
      <button className="header--cta cta">Hire Me</button>
      <div className="header--nav-toggle">
        <span></span>
      </div>
    </header>
  );
};

export default Header; 