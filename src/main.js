import './assets/scss/app.scss';

import Lenis from 'lenis'
import barba from '@barba/core';

import $ from "jquery"

import { gsap } from "gsap";
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


function disableClicks() {
  document.body.classList.add('disable-clicks');
}

function enableClicks() {
  document.body.classList.remove('disable-clicks');
}

const transition = {
  element: document.querySelector('.transition'),
  wrapper: document.querySelector('.transition_wrapper'),
  figures: document.querySelectorAll('.transition_figure'),
};

const initTransition = () => {
  gsap.set(transition.wrapper, { yPercent: -125, filter: "blur(10px)", opacity: 1, immediateRender: false });
  gsap.set(transition.figures, { rotateY: 5, rotateX: 5, yPercent: -50, immediateRender: false });
  console.log('reset')

};

const enterTransition = () => {
  const tl = gsap.timeline({
    defaults: { duration: 1.2, ease: 'expo.out' },
    onComplete: enableClicks // Re-enable clicks once the animation completes
  });

  //-> Returns a Promise that resolves when the "transition.wrapper" animation is complete
  return new Promise((resolve) => {
      tl.to(transition.wrapper, {
          yPercent: 25,
          filter: "blur(0px)",
          onComplete: resolve,
      })
          .to(
              transition.figures,
              {
                  duration: 2,
                  rotateY: -5,
                  rotateX: -5,
                  yPercent: 100,
                  ease: 'power2.in',
                  stagger: {
                      amount: 0.25,
                      grid: 'auto',
                      from: 'center',
                  },
              },
              0 //-> Starts at the same time as the wrapper animation
          )
  });
};

const leaveTransition = () => {
  console.log('leave')

  disableClicks(); // Disable clicks at the start of the transition

  const tl = gsap.timeline({ defaults: { duration: 1.2, ease: 'expo.inOut' } });
  

  tl.to(transition.wrapper, {
      yPercent: 100,
      filter: "blur(10px)",
      onComplete: () => {
        initTransition(); //-> Calls the init function to reset the elements for the next transition
        enableClicks(); // 
    },
  })
};

barba.init({
  debug: true,
  transitions: [
      {
          name: 'page-transition',

          // This function handles the transition when leaving the current page
          async leave() {
              //-> 'async' allows us to use 'await' for handling asynchronous code.
              //--> The `enterTransition()` function triggers the animation that visually transitions the page out.
              //--> Since `enterTransition()` returns a Promise, the `await` keyword is used here to pause execution of the leave function until the Promise resolves.

              await enterTransition(); //-> Waits for the 'enterTransition' animation to finish before continuing
          },

          // This function handles what happens when the new page is ready to be shown
          enter() {
              // Once the new content has been loaded, the `hide()` function is called to reverse the animation or apply any necessary transition for the newly entered content.
              leaveTransition();
          },
      },
  ],
});


// Preload animation 

  const item = document.querySelector('#name');

  function animateScale(element, scaleValue) {
    gsap.fromTo(element, { scale: 1 }, { scale: scaleValue, duration: 2, ease: "power1.out" });
  }

  function wrapLetters(text) {
    item.innerHTML = '';
    [...text].forEach(letter => {
      const span = document.createElement('span');
      span.style.filter = 'blur(8px)';
      span.textContent = letter;
      item.appendChild(span);
    });
  }

  function fadeanim() {
    gsap.to('#preloader', {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    });
  }

  function animateBlurEffect() {
    const letters = item.children;
    let index = 0;

    function clearNextLetter() {
      if (index < letters.length) {
        gsap.to(letters[index], { filter: 'blur(0px)', duration: 0.5 });
        index++;
        if (index < letters.length) {
          setTimeout(clearNextLetter, 100);
        }
      }
    }

    setTimeout(clearNextLetter, 0);

    fadeanim()
  }

  function shuffleLetters(finalText) {
    wrapLetters('');
    wrapLetters(finalText.replace(/./g, ' '));  // Initial blurred letters

    let textArray = finalText.split('');
    let shufflingCounter = 0;
    let intervalHandles = [];

    function shuffle(index) {
      if (shufflingCounter < 30) {
        textArray[index] = 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
        item.children[index].textContent = textArray[index];
      } else {
        item.children[index].textContent = finalText.charAt(index);
        clearInterval(intervalHandles[index]);
      }
    }

    for (let i = 0; i < finalText.length; i++) {
      intervalHandles[i] = setInterval(shuffle, 80, i);
    }

    setTimeout(() => {
      shufflingCounter = 30;
      for (let i = 0; i < finalText.length; i++) {
        item.children[i].textContent = finalText.charAt(i);
        clearInterval(intervalHandles[i]);
      }
      animateBlurEffect();
    }, 1000);
  }
  

  document.addEventListener("DOMContentLoaded", function () {
  
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      const preloader = document.getElementById("preloader")
      if(preloader) {
        preloader.style.display = "flex";
      }
      const newText = item.textContent.charAt(0).toUpperCase() + item.textContent.slice(1).toLowerCase();
      animateScale(item, 1.25);
      shuffleLetters(newText);
      initTransition()
      localStorage.setItem("hasVisitedBefore", "true");
    }

  });

  // const newText = item.textContent.charAt(0).toUpperCase() + item.textContent.slice(1).toLowerCase();
  // animateScale(item, 1.25);
  // shuffleLetters(newText);


  document.addEventListener("DOMContentLoaded", () => {

  initTransition()


    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const links = document.querySelectorAll(".link");
    const socialLinks = document.querySelectorAll(".socials a");
    let isAnimating = false;


var splitTitle = new SplitText(".logo-heading h2", { type: "chars" });

    menuToggle.addEventListener("click", () => {
      if (isAnimating) return;

      if (menuToggle.classList.contains("closed")) {
        menuToggle.classList.remove("closed");
        menuToggle.classList.add("opened");

        isAnimating = true;

        gsap.to(menu, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "expo.inOut",
          duration: 1.5,
          onStart: () => {
            menu.style.pointerEvents = "all";
          },
          onComplete: () => {
            isAnimating = false;
          },
        });

        // Animate main links when opening
        gsap.to(links, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.85,
          duration: 1,
          ease: "power3.out",
        });

        // Animate social links when opening
        gsap.to(socialLinks, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          delay: 0.85,
          duration: 1,
          ease: "power3.out",
        });

        const tl = gsap.timeline();

        tl.to(".video-wrapper", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "expo.inOut",
          duration: 1.5,
          delay: 0.5,
        }).to(".video-wrapper", {
          duration: 0.1, // Add a slight delay before toggling class
          onComplete: () => document.querySelector(".video-wrapper").classList.add("inner-border-active")
        });
      
        // Animate header text rotation
        gsap.from(splitTitle.chars, {
          translateY: 200, 
          rotateY: 25,
          scale: 0.8,
          stagger: 0.05,
          delay: 0.75,
          duration: 1.5,
          ease: "power4.out",
        });
      } else {

        menuToggle.classList.remove("opened");
        menuToggle.classList.add("closed");

        isAnimating = true;

        gsap.to(menu, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          ease: "expo.inOut",
          duration: 1.5,
          onComplete: () => {
            menu.style.pointerEvents = "none";
            gsap.set(menu, {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });

            gsap.set(links, { y: 30, opacity: 0 });
            gsap.set(socialLinks, { y: 30, opacity: 0 });
            gsap.set(".video-wrapper", {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
            gsap.set(".logo-heading h2 span", {
              y: 500,
              rotateY: 90,
              scale: 0.8,
            });

            isAnimating = false;
          },
        });
      }
      
    });
  });
  