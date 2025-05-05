import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import Hammer from 'hammerjs';
import './App.css';
import './assets/main.css';
import Header from './components/Header';
import MobileNotification from './components/MobileNotification';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import OuterNav from './components/OuterNav';

// Create a global state for modal status
export const ModalContext = React.createContext({
  isModalOpen: false,
  setModalOpen: () => {}
});

const App = () => {
  // Global state to track if any modal is open
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Initialize all the JavaScript functionality
    const { handleScrollDebounced, handleKeyUp, cleanupTouchEvents } = initializePortfolio();

    // Cleanup function for component unmount
    return () => {
      // Remove event listeners when component unmounts
      document.removeEventListener('wheel', handleScrollDebounced);
      document.removeEventListener('keyup', handleKeyUp);
      if (cleanupTouchEvents) cleanupTouchEvents();
    };
  }, [isModalOpen]); // Re-initialize when modal state changes

  const initializePortfolio = () => {
    // Global state for scroll locking
    let isScrolling = false;
    let lastScrollTimestamp = 0;
    const scrollCooldown = 1000; // ms between scroll actions
    
    // Debounced scroll handler to ensure one section per scroll
    function handleScrollDebounced(e) {
      // Skip if outer nav is visible or if a modal is open
      if ($('.outer-nav').hasClass('is-vis') || isModalOpen) {
        return;
      }
      
      e.preventDefault();
      
      // Return if currently scrolling or cooldown hasn't elapsed
      const now = Date.now();
      if (isScrolling || now - lastScrollTimestamp < scrollCooldown) {
        return;
      }
      
      // Set scrolling state and update timestamp
      isScrolling = true;
      lastScrollTimestamp = now;
      
      // Determine scroll direction - using a much smaller threshold
      const direction = e.deltaY > 0 ? 1 : -1;
      
      // Perform the scroll
      updateHelper(direction);
      
      // Release scroll lock after animation completes
      setTimeout(() => {
        isScrolling = false;
      }, scrollCooldown);
    }
    
    // Function to handle keyboard navigation
    function handleKeyUp(e) {
      // Skip if outer nav is visible or if a modal is open
      if ($('.outer-nav').hasClass('is-vis') || isModalOpen) {
        return;
      }
      
      const now = Date.now();
      if (isScrolling || now - lastScrollTimestamp < scrollCooldown) {
        return;
      }
      
      isScrolling = true;
      lastScrollTimestamp = now;
      
      if (e.keyCode === 40) { // Down arrow
        updateHelper(1);
      } else if (e.keyCode === 38) { // Up arrow
        updateHelper(-1);
      }
      
      setTimeout(() => {
        isScrolling = false;
      }, scrollCooldown);
    }
    
    // Add event listeners with passive: false to prevent defaults
    document.addEventListener('wheel', handleScrollDebounced, { passive: false });
    document.addEventListener('keyup', handleKeyUp);

    // Native touch event handling for mobile - replacing Hammer.js completely
    let touchStartY = 0;
    let touchEndY = 0;
    const MIN_SWIPE_DISTANCE = 50; // Minimum swipe distance to trigger navigation
    
    function handleTouchStart(e) {
      touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchEnd(e) {
      // Skip if menu is open or if a modal is open
      if ($('.outer-nav').hasClass('is-vis') || isModalOpen) {
        return;
      }
      
      // Skip if already scrolling or in cooldown
      const now = Date.now();
      if (isScrolling || now - lastScrollTimestamp < scrollCooldown) {
        return;
      }
      
      touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchStartY - touchEndY;
      
      // Only process if the swipe is long enough
      if (Math.abs(touchDiff) < MIN_SWIPE_DISTANCE) {
        return;
      }
      
      isScrolling = true;
      lastScrollTimestamp = now;
      
      // Get current position
      const curActive = $('.side-nav').find('.is-active');
      const curPos = $('.side-nav').children().index(curActive);
      const lastItem = $('.side-nav').children().length - 1;
      
      if (touchDiff > 0) {
        // Swipe up (go to next section)
        if (curPos !== lastItem) {
          const nextPos = curPos + 1;
          updateNavs(nextPos);
          updateContent(curPos, nextPos, lastItem);
        }
      } else {
        // Swipe down (go to previous section)
        if (curPos !== 0) {
          const nextPos = curPos - 1;
          updateNavs(nextPos);
          updateContent(curPos, nextPos, lastItem);
        }
      }
      
      setTimeout(() => {
        isScrolling = false;
      }, scrollCooldown);
    }
    
    // Prevent default on touchmove to stop browser scrolling
    function handleTouchMove(e) {
      if (!$('.outer-nav').hasClass('is-vis') && !isModalOpen) {
        e.preventDefault();
      }
    }
    
    // Setup touch event listeners
    const viewport = document.getElementById('viewport');
    let cleanupTouchEvents = null;
    
    if (viewport) {
      viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
      viewport.addEventListener('touchend', handleTouchEnd, { passive: true });
      viewport.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      // Return a cleanup function
      cleanupTouchEvents = function() {
        viewport.removeEventListener('touchstart', handleTouchStart);
        viewport.removeEventListener('touchend', handleTouchEnd);
        viewport.removeEventListener('touchmove', handleTouchMove);
      };
      
      // Handle tap events for navigation
      const navLinks = document.querySelectorAll('.side-nav li, .outer-nav li');
      navLinks.forEach(link => {
        let startTime = 0;
        
        link.addEventListener('touchstart', () => {
          startTime = Date.now();
        });
        
        link.addEventListener('touchend', (e) => {
          const endTime = Date.now();
          const tapDuration = endTime - startTime;
          
          // Only trigger for short taps (under 300ms)
          if (tapDuration < 300 && !isScrolling) {
            e.preventDefault();
            $(link).trigger('click');
          }
        });
      });
    }

    // Add the rest of the functions from the original implementation
    function updateHelper(direction) {
      // Get current position
      const curActive = $('.side-nav').find('.is-active');
      const curPos = $('.side-nav').children().index(curActive);
      const lastItem = $('.side-nav').children().length - 1;
      
      // Skip if a modal is open
      if (isModalOpen) {
        return;
      }
      
      if (direction === 1) { // Scroll down - show next section
        if (curPos !== lastItem) {
          // Update active section
          const nextPos = curPos + 1;
          updateNavs(nextPos);
          updateContent(curPos, nextPos, lastItem);
        }
      } else { // Scroll up - show previous section
        if (curPos !== 0) {
          // Update active section
          const nextPos = curPos - 1;
          updateNavs(nextPos);
          updateContent(curPos, nextPos, lastItem);
        }
      }
    }
    
    function updateNavs(nextPos) {
      $('.side-nav, .outer-nav').children().removeClass('is-active');
      $('.side-nav').children().eq(nextPos).addClass('is-active');
      $('.outer-nav').children().eq(nextPos).addClass('is-active');
    }
    
    function updateContent(curPos, nextPos, lastItem) {
      $('.main-content').children().removeClass('section--is-active');
      $('.main-content').children().eq(nextPos).addClass('section--is-active');
      $('.main-content .section').children().removeClass('section--next section--prev');
      
      if (curPos === lastItem && nextPos === 0) {
        $('.main-content .section').children().eq(0).addClass('section--next');
      } else if (curPos === 0 && nextPos === lastItem) {
        $('.main-content .section').children().eq(0).addClass('section--prev');
      } else {
        $('.main-content .section').children().eq(curPos).addClass(
          nextPos > curPos ? 'section--prev' : 'section--next'
        );
      }
    }

    return {
      handleScrollDebounced,
      handleKeyUp,
      cleanupTouchEvents
    };
  };
    
  return (
    <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
      <div className="device">
        <div className="mobile-notification">
          <MobileNotification />
        </div>
        <div className="perspective effect-rotate-left">
          <div className="container" id="viewport">
            <div className="outer-nav--return"></div>
            <div id="viewport" className="l-viewport">
              <div className="l-wrapper">
                <Header />
                <Sidebar />
                <MainContent />
              </div>
            </div>
            <OuterNav />
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
};

export default App; 