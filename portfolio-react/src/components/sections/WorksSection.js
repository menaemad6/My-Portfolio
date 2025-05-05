import React from 'react';

const WorksSection = () => {
  return (
    <div className="work">
      <h2>Selected work</h2>
      <div className="work--lockup">
        <ul className="slider">
          <li className="slider--item slider--item-left">
            <a href="https://drosak.xyz" target="_blank" rel="noopener noreferrer">
              <div className="slider--item-image">
                <img src="assets/img/web1.png" alt="Drosak Academy" />
              </div>
              <p className="slider--item-title">Drosak Academy</p>
              <p className="slider--item-description">Educational Website</p>
            </a>
          </li>
          <li className="slider--item slider--item-center">
            <a href="https://wang-team.online" target="_blank" rel="noopener noreferrer">
              <div className="slider--item-image">
                <img src="assets/img/web2.png" alt="Wang Team Website" />
              </div>
              <p className="slider--item-title">Wang Team Website</p>
              <p className="slider--item-description">Team Portfolio</p>
            </a>
          </li>
          <li className="slider--item slider--item-right">
            <a href="https://ektashef.pythonanywhere.com" target="_blank" rel="noopener noreferrer">
              <div className="slider--item-image">
                <img src="assets/img/web3.png" alt="Ektashef" />
              </div>
              <p className="slider--item-title">Ektashef</p>
              <p className="slider--item-description">Information Website</p>
            </a>
          </li>
          <li className="slider--item">
            <a href="https://bero-joseph.netlify.app" target="_blank" rel="noopener noreferrer">
              <div className="slider--item-image">
                <img src="assets/img/web4.png" alt="Personal Portfolio" />
              </div>
              <p className="slider--item-title">Personal Portfolio</p>
              {/* <p className="slider--item-description">Lorem ipsum dolor sit amet.</p> */}
            </a>
          </li>
          <li className="slider--item">
            <a href="https://mario-amgad.netlify.app" target="_blank" rel="noopener noreferrer">
              <div className="slider--item-image">
                <img src="assets/img/work5.png" alt="Personal Portfolio" />
              </div>
              <p className="slider--item-title">Personal Portfolio</p>
              {/* <p className="slider--item-description">Lorem ipsum dolor sit amet.</p> */}
            </a>
          </li>
        </ul>
        <div className="slider--prev">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 150 118" style={{ enableBackground: 'new 0 0 150 118' }} xmlSpace="preserve">
            <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
              <path d="M561,1169C525,1155,10,640,3,612c-3-13,1-36,8-52c8-15,134-145,281-289C527,41,562,10,590,10c22,0,41,9,61,29
              c55,55,49,64-163,278L296,510h575c564,0,576,0,597,20c46,43,37,109-18,137c-19,10-159,13-590,13l-565,1l182,180
              c101,99,187,188,193,199c16,30,12,57-12,84C631,1174,595,1183,561,1169z" />
            </g>
          </svg>
        </div>
        <div className="slider--next">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 150 118" style={{ enableBackground: 'new 0 0 150 118' }} xmlSpace="preserve">
            <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
              <path d="M870,1167c-34-17-55-57-46-90c3-15,81-100,194-211l187-185l-565-1c-431,0-571-3-590-13c-55-28-64-94-18-137c21-20,33-20,597-20h575l-192-193C800,103,794,94,849,39c20-20,39-29,61-29c28,0,63,30,298,262c147,144,272,271,279,282c30,51,23,60-219,304C947,1180,926,1196,870,1167z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WorksSection; 