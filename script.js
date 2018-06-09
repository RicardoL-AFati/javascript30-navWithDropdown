// Selecting elements
const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop;
const triggers = document.querySelectorAll('.mainUL > li');
const background = document.querySelector('.dropdownBackground');

// Displaying the dropdown and background upon main li being entered
function handleEnter() {
  this.classList.add('trigger-enter');
  // Ensures trigger-enter-active is not added after it has been removed
  setTimeout(() => {
    if (this.classList.contains('trigger-enter')){
     this.classList.add('trigger-enter-active')     
    }
  }, 150);
  // Sets backgrond div opacity to 1
  background.classList.add('open');
  // Selecting dropdown for this li
  const dropdown = this.querySelector('.dropdown');
  // Size and position (relative to viewport) of the dropdown and nav
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();
  // Nav is not at top of page so dropdown X and Y coordinates must be ajusted
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    // X and Y of the dropdown are adjusted
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
    // Coordinates are moved up and left by the space between nav and the viewport    
  };
  // Setting the style of background div using coordinates
  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}

// Hiding the dropdown and background upon mouse leaving main li
function handleLeave() {
  // Setting opacity and display of both dropdown and background - to 0
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}

// Toggles nav position: fixed 
function fixNav() {
  // If top of window goes below top of nav  
  if (window.scrollY > topOfNav) {
    // Add padding to body to account for nav being fixed and no longer taking up space  
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    // Adding class to make nav fixed   
    document.body.classList.add('fixed-nav');    
  } else {
    // Removing padding and fixed class  
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');   
  }
}

// Adding mouseenter and leave events for main li's
triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
// Scroll event listener to fix nav
window.addEventListener('scroll', fixNav);
