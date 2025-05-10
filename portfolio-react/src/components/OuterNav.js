import React, { useEffect } from 'react';
import $ from 'jquery';

// Custom styles for outer nav visibility and positioning
const customStyles = `
  .outer-nav {
    position: absolute !important;
    top: 50% !important;
    left: 55% !important;
    transform: translateY(-50%) !important;
    transform-style: preserve-3d !important;
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
    text-align: center !important;
    visibility: hidden !important;
    transition: visibility 0s 0.2s !important;
    z-index: 9999 !important;
    width: auto !important;
  }
  
  .outer-nav.is-vis {
    visibility: visible !important;
    transition: none !important;
  }
  
  .outer-nav > li {
    transform-style: preserve-3d !important;
    transform: translateX(350px) translateZ(-1000px) !important;
    font-size: 55px !important;
    font-weight: 900 !important;
    opacity: 0 !important;
    cursor: pointer !important;
    transition: transform 0.2s, opacity 0.2s !important;
    display: block !important;
    margin: 20px 0 !important;
    color: white !important;
    text-shadow: 0 1px 5px rgba(0,0,0,0.5) !important;
    position: relative !important;
  }
  
  .outer-nav > li.is-vis {
    transform: translateX(0) translateZ(0) !important;
    opacity: 1 !important;
    transition: transform 0.4s, opacity 0.4s !important;
    pointer-events: auto !important;
  }
  
  .outer-nav--return {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    display: none !important;
    cursor: pointer !important;
    z-index: 8999 !important;
  }
  
  .outer-nav--return.is-vis {
    display: block !important;
  }
  
  .outer-nav > li::before {
    content: "" !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -25%) !important;
    width: 110% !important;
    height: 15px !important;
    opacity: 0 !important;
    background-color: #0f33ff !important;
    z-index: -1 !important;
  }
  
  .outer-nav > li.is-active::before {
    opacity: 1 !important;
  }
  
  .outer-nav li.is-vis:nth-child(1) {
    transition-delay: 0s !important;
  }
  
  .outer-nav li.is-vis:nth-child(2) {
    transition-delay: 0.04s !important;
  }
  
  .outer-nav li.is-vis:nth-child(3) {
    transition-delay: 0.08s !important;
  }
  
  .outer-nav li.is-vis:nth-child(4) {
    transition-delay: 0.12s !important;
  }
  
  .outer-nav li.is-vis:nth-child(5) {
    transition-delay: 0.16s !important;
  }
  
  .effect-rotate-left--animate .container {
    transform: translateZ(-1800px) translateX(-50%) rotateY(45deg) !important;
    transition: transform 0.4s !important;
  }
  
  .perspective--modalview .container {
    position: absolute !important;
    overflow: hidden !important;
    width: 100% !important;
    height: 100% !important;
    left: 0 !important;
  }
  
  .perspective--modalview {
    position: fixed !important;
    perspective: 1500px !important;
    width: 100% !important;
    height: 100% !important;
  }
  
  @media (max-width: 767px) {
    .outer-nav {
      left: 50% !important;
    }
    
    .outer-nav > li {
      font-size: 44px !important;
    }
  }
  
  @media (max-width: 600px) {
    .outer-nav > li {
      font-size: 34px !important;
    }
  }
`;

const OuterNav = () => {
  // Add effect to ensure proper initialization
  useEffect(() => {
    // Add click handlers to nav items
    const navItems = document.querySelectorAll('.outer-nav > li');
    navItems.forEach((item, index) => {
      item.addEventListener('click', () => handleNavClick(index));
    });
    
    // Add click handler to return element
    const returnElement = document.querySelector('.outer-nav--return');
    if (returnElement) {
      returnElement.addEventListener('click', handleOuterNavClose);
    }
    
    // Cleanup function
    return () => {
      const navItems = document.querySelectorAll('.outer-nav > li');
      navItems.forEach((item, index) => {
        item.removeEventListener('click', () => handleNavClick(index));
      });
      
      const returnElement = document.querySelector('.outer-nav--return');
      if (returnElement) {
        returnElement.removeEventListener('click', handleOuterNavClose);
      }
    };
  }, []);

  const handleOuterNavClose = () => {
    // First remove the animation class
    $('.perspective').removeClass('effect-rotate-left--animate');
    
    // First remove visibility from nav items with a slight delay
    $('.outer-nav li').removeClass('is-vis');
    
    // Then remove the modalview class after the animation completes
    setTimeout(() => {
      // Remove the modalview class
      $('.perspective').removeClass('perspective--modalview');
      
      // Remove visibility classes from other elements
      $('.outer-nav').removeClass('is-vis');
      $('.outer-nav--return').removeClass('is-vis');
    }, 400);
  };

  const handleNavClick = (index) => {
    // First close the outer nav
    handleOuterNavClose();
    
    // Then handle navigation after a short delay
    setTimeout(() => {
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
    }, 500);
  };

  return (
    <>
      <style>{customStyles}</style>
      <ul className="outer-nav">
        <li className="is-active">Home</li>
        <li>Works</li>
        <li>About</li>
        <li>Contact</li>
        <li>Hire Me</li>
      </ul>
      <div className="outer-nav--return" onClick={handleOuterNavClose}></div>
    </>
  );
};

export default OuterNav; 
