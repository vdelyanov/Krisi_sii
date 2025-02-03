import { submitContactForm } from './contentfulClient.js';

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