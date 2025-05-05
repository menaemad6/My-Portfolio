import React, { useEffect } from 'react';
import $ from 'jquery';
import Hammer from 'hammerjs';
import './App.css';
import './assets/main.css';
import Header from './components/Header';
import MobileNotification from './components/MobileNotification';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import OuterNav from './components/OuterNav';

const App = () => {
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
  }, []);

  const initializePortfolio = () => {
    // Global state for scroll locking
    let isScrolling = false;
    let lastScrollTimestamp = 0;
    const scrollCooldown = 1000; // ms between scroll actions
    
    // Debounced scroll handler to ensure one section per scroll
    function handleScrollDebounced(e) {
      // Skip if outer nav is visible
      if ($('.outer-nav').hasClass('is-vis')) {
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
      if ($('.outer-nav').hasClass('is-vis')) {
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
    
    // Add event listeners
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
      // Skip if menu is open
      if ($('.outer-nav').hasClass('is-vis')) {
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
      if (!$('.outer-nav').hasClass('is-vis')) {
        e.preventDefault();
      }
    }
    
    // Setup touch event listeners
    const viewport = document.getElementById('viewport');
    let cleanupTouchEvents = null;
    
    if (viewport) {
      viewport.addEventListener('touchstart', handleTouchStart, false);
      viewport.addEventListener('touchend', handleTouchEnd, false);
      viewport.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      // Return a cleanup function
      cleanupTouchEvents = function() {
        viewport.removeEventListener('touchstart', handleTouchStart);
        viewport.removeEventListener('touchend', handleTouchEnd);
        viewport.removeEventListener('touchmove', handleTouchMove);
      };
      
      // Handle tap events for navigation without Hammer.js
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

    // Side navigation and outer nav click handlers
    $('.side-nav li, .outer-nav li').click(function() {
      if (!($(this).hasClass('is-active')) && !isScrolling) {
        const $this = $(this);
        const curActive = $this.parent().find('.is-active');
        const curPos = $this.parent().children().index(curActive);
        const nextPos = $this.parent().children().index($this);
        const lastItem = $(this).parent().children().length - 1;

        isScrolling = true;
        lastScrollTimestamp = Date.now();
        
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
        
        setTimeout(() => {
          isScrolling = false;
        }, scrollCooldown);
      }
    });

    // CTA button click handler
    $('.cta').click(function() {
      if (!isScrolling) {
        const curActive = $('.side-nav').find('.is-active');
        const curPos = $('.side-nav').children().index(curActive);
        const lastItem = $('.side-nav').children().length - 1;
        const nextPos = lastItem;

        isScrolling = true;
        lastScrollTimestamp = Date.now();
        
        updateNavs(lastItem);
        updateContent(curPos, nextPos, lastItem);
        
        setTimeout(() => {
          isScrolling = false;
        }, scrollCooldown);
      }
    });

    // Initialize outer nav
    outerNav();
    
    // Initialize work slider
    workSlider();
    
    // Initialize form labels transition
    transitionLabels();
    
    // Return the event handler functions for cleanup
    return { handleScrollDebounced, handleKeyUp, cleanupTouchEvents };
  };

  return (
    <div className="App">
      <MobileNotification />
      
      <div className="perspective effect-rotate-left">
        <div className="container">
          <div className="outer-nav--return"></div>
          <div id="viewport" className="l-viewport">
            <div className="l-wrapper">
              <Header />
              <Sidebar />
              <MainContent />
            </div>
          </div>
        </div>
        <OuterNav />
      </div>
    </div>
  );
};

// Helper functions for navigation
function updateHelper(param) {
  const curActive = $('.side-nav').find('.is-active');
  const curPos = $('.side-nav').children().index(curActive);
  const lastItem = $('.side-nav').children().length - 1;
  let nextPos = 0;

  if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
    if (curPos !== lastItem) {
      nextPos = curPos + 1;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    } else {
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    }
  } else if (param.type === "swipedown" || param.keyCode === 38 || param < 0) {
    if (curPos !== 0) {
      nextPos = curPos - 1;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    } else {
      nextPos = lastItem;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    }
  }
}

// Update navigation elements
function updateNavs(nextPos) {
  $('.side-nav, .outer-nav').children().removeClass('is-active');
  $('.side-nav').children().eq(nextPos).addClass('is-active');
  $('.outer-nav').children().eq(nextPos).addClass('is-active');
}

// Update content sections
function updateContent(curPos, nextPos, lastItem) {
  $('.main-content').children().removeClass('section--is-active');
  $('.main-content').children().eq(nextPos).addClass('section--is-active');
  $('.main-content .section').children().removeClass('section--next section--prev');

  if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
    $('.main-content .section').children().removeClass('section--next section--prev');
  } else if (curPos < nextPos) {
    $('.main-content').children().eq(curPos).children().addClass('section--next');
  } else {
    $('.main-content').children().eq(curPos).children().addClass('section--prev');
  }

  if (nextPos !== 0 && nextPos !== lastItem) {
    $('.header--cta').addClass('is-active');
  } else {
    $('.header--cta').removeClass('is-active');
  }
}

// Outer navigation
function outerNav() {
  $('.header--nav-toggle').click(function() {
    $('.perspective').addClass('perspective--modalview');
    setTimeout(function() {
      $('.perspective').addClass('effect-rotate-left--animate');
    }, 25);
    $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');
  });

  $('.outer-nav--return, .outer-nav li').click(function() {
    $('.perspective').removeClass('effect-rotate-left--animate');
    setTimeout(function() {
      $('.perspective').removeClass('perspective--modalview');
    }, 400);
    $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');
  });
}

// Work slider functionality
function workSlider() {
  $('.slider--prev, .slider--next').click(function() {
    const $this = $(this);
    const curLeft = $('.slider').find('.slider--item-left');
    const curLeftPos = $('.slider').children().index(curLeft);
    const curCenter = $('.slider').find('.slider--item-center');
    const curCenterPos = $('.slider').children().index(curCenter);
    const curRight = $('.slider').find('.slider--item-right');
    const curRightPos = $('.slider').children().index(curRight);
    const totalWorks = $('.slider').children().length;
    const $left = $('.slider--item-left');
    const $center = $('.slider--item-center');
    const $right = $('.slider--item-right');
    const $item = $('.slider--item');

    $('.slider').animate({ opacity: 0 }, 400);

    setTimeout(function() {
      if ($this.hasClass('slider--next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('slider--item-left').next().addClass('slider--item-left');
          $center.removeClass('slider--item-center').next().addClass('slider--item-center');
          $right.removeClass('slider--item-right').next().addClass('slider--item-right');
        } else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('slider--item-left').first().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          } else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $item.removeClass('slider--item-center').first().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          } else {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $item.removeClass('slider--item-right').first().addClass('slider--item-right');
          }
        }
      } else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
          $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
          $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
        } else {
          if (curLeftPos === 0) {
            $item.removeClass('slider--item-left').last().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          } else if (curCenterPos === 0) {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $item.removeClass('slider--item-center').last().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          } else {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $item.removeClass('slider--item-right').last().addClass('slider--item-right');
          }
        }
      }
    }, 400);

    $('.slider').animate({ opacity: 1 }, 400);
  });
}

// Form transitions
function transitionLabels() {
  $('.work-request--information input').focusout(function() {
    const textVal = $(this).val();
    if (textVal === "") {
      $(this).removeClass('has-value');
    } else {
      $(this).addClass('has-value');
    }
    // correct mobile device window position
    window.scrollTo(0, 0);
  });
}

export default App; 