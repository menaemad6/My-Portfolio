import React from 'react';
import $ from 'jquery';

const Sidebar = () => {
  const handleNavClick = (index) => {
    const curActive = $('.side-nav').find('.is-active');
    const curPos = $('.side-nav').children().index(curActive);
    const lastItem = $('.side-nav').children().length - 1;
    
    // Update both navigations
    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(index).addClass('is-active');
    $('.outer-nav').children().eq(index).addClass('is-active');
    
    // Update content
    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(index).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');
    
    if (curPos < index) {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    } else if (curPos > index) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
  };

  return (
    <nav className="l-side-nav">
      <ul className="side-nav">
        <li className="is-active" onClick={() => handleNavClick(0)}><span>Home</span></li>
        <li onClick={() => handleNavClick(1)}><span>Works</span></li>
        <li onClick={() => handleNavClick(2)}><span>About</span></li>
        <li onClick={() => handleNavClick(3)}><span>Contact</span></li>
        <li onClick={() => handleNavClick(4)}><span>Hire Me</span></li>
      </ul>
    </nav>
  );
};

export default Sidebar; 