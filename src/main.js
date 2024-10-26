import './assets/scss/app.scss';

import { gsap } from "gsap";
import Lenis from 'lenis'
import barba from '@barba/core';
import $ from "jquery"

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

window.addEventListener('load', initTransition);
