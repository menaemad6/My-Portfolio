// This is a test file to check for any errors in the console
console.log('Testing navigation functionality');

// Check if the navigation toggle works
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  
  // Check if the outer nav is in the correct position
  const perspectiveDiv = document.querySelector('.perspective');
  const outerNav = document.querySelector('.outer-nav');
  
  console.log('Perspective div found:', perspectiveDiv !== null);
  console.log('OuterNav found:', outerNav !== null);
  console.log('OuterNav is inside perspective div:', 
              outerNav && perspectiveDiv && perspectiveDiv.contains(outerNav));
  
  const navToggle = document.querySelector('.header--nav-toggle');
  if (navToggle) {
    console.log('Navigation toggle found');
    navToggle.addEventListener('click', () => {
      console.log('Navigation toggle clicked');
      setTimeout(() => {
        const outerNav = document.querySelector('.outer-nav');
        const isVisible = outerNav && outerNav.classList.contains('is-vis');
        console.log('Outer nav is visible:', isVisible);
        
        const navItems = document.querySelectorAll('.outer-nav > li');
        console.log('Nav items found:', navItems.length);
        console.log('Nav items with is-vis class:', document.querySelectorAll('.outer-nav > li.is-vis').length);
      }, 100);
    });
  } else {
    console.log('Navigation toggle not found');
  }
}); 