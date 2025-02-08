import { submitContactForm } from './contentfulClient.js';

import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 1.6, // Slightly increase duration for smoother easing
  infinite: false, // Ensure looping is smooth
  smoothWheel: true, // Smooth scrolling for mouse wheel
  smoothTouch: false, // Ensure smoothness for touch devices
});

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

document.addEventListener("DOMContentLoaded", function () { 

    document.getElementById('contact-form').addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = document.getElementById('names').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
  
      await submitContactForm(name, email, message);
  });
  
    lenis.scrollTo(0) 
    window.scrollTo(0, 0);

})