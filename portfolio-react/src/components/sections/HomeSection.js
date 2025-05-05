import React from 'react';

const HomeSection = () => {
  return (
    <div className="intro">
      <div className="intro--banner">
        <h1>Your next<br />interactive<br />experience</h1>
        <button className="cta">Hire Me
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 150 118" style={{ enableBackground: 'new 0 0 150 118' }} xmlSpace="preserve">
            <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
              <path d="M870,1167c-34-17-55-57-46-90c3-15,81-100,194-211l187-185l-565-1c-431,0-571-3-590-13c-55-28-64-94-18-137c21-20,33-20,597-20h575l-192-193C800,103,794,94,849,39c20-20,39-29,61-29c28,0,63,30,298,262c147,144,272,271,279,282c30,51,23,60-219,304C947,1180,926,1196,870,1167z" />
            </g>
          </svg>
          <span className="btn-background"></span>
        </button>
        <img src="assets/img/introduction-visual.png" alt="Welcome" />
      </div>
      <div className="intro--options">
        <a href="#0">
          <h3>Full-Stack Developer</h3>
          {/* <p>20+ Full-Stack projects done.</p> */}
        </a>
        <a href="#0">
          <h3>Django Developer</h3>
          {/* <p>3 Years of Django Expert</p> */}
        </a>
        <a href="#0">
          <h3>Python Expert</h3>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do.</p> */}
        </a>
      </div>
    </div>
  );
};

export default HomeSection; 