import './assets/scss/app.scss';

import $ from "jquery"

import { gsap } from "gsap";
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

import CookieBox from "./CookieBox.js";
const cookieBox = new CookieBox("#cookie-box");

import './homepage.js'

import barba from '@barba/core';
import Lenis from 'lenis'
import { mx_fractal_noise_float } from 'three/webgpu';

const lenis = new Lenis({
  duration: 1.5, // Slightly increase duration for smoother easing
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

  var homepage = document.querySelector("main#homepage");

  if (!homepage) {
    lenis.scrollTo(0, { duration: 0 });
  } else {
    setTimeout(() => {
      const newDiv = document.createElement('div');
      newDiv.className = 'h-[10vh]';
      const mainElement = document.querySelector('main.homepage');
      if (mainElement) {
          mainElement.appendChild(newDiv);
      } 
    }, 1000)
  }
});

// Page Transiiton  
const transition = {
  main: document.querySelector('main'),
  menu: document.querySelector('.menu'),
  header: document.querySelector('header'),
  cursor: document.querySelectorAll('.cursor-follow svg'),

};

// const enterTransition = () => {
//   return new Promise((resolve) => {
//     const tl = gsap.timeline({
//       onComplete: resolve,
//     });
//     const menuToggle = document.querySelector(".menu-toggle");
//     if (menuToggle.classList.contains("closed")) {
//     tl.to(transition.main, {
//       opacity: 0,
//       filter: 'blur(20px)',
//       ease: "expo.inOut",
//       duration: 1.5,
//     }, 0).to(transition.header, {
//       opacity: 0,
//       duration: 1.2,
//     }, 0).to(transition.cursor, {
//       opacity: 0,
//       duration: 0.8,
//     });
//     } else {
//     tl.to(transition.menu, {
//       clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
//       ease: "expo.inOut",
//       duration: 1.2,
//     }, 0).to(transition.main, {
//       opacity: 0,
//       filter: 'blur(20px)',
//       ease: "expo.inOut",
//       duration: 1.2,
//     }, 0).to(transition.header, {
//       opacity: 0,
//       duration: 1.2,
//     }, 0).to(transition.cursor, {
//       opacity: 0,
//       duration: 0.8,
//     });
//   }

//   });
// }; 

const enterTransition = () => {

  const childElements = transition.main.querySelectorAll('*');


  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    });
    const menuToggle = document.querySelector(".menu-toggle");
    if (menuToggle.classList.contains("closed")) {
    tl.to(childElements, {
      opacity: 0,
      filter: 'blur(20px)',
      ease: "expo.inOut",
      duration: 1.5,
    }, 0).to(transition.cursor, {
      opacity: 0,
      duration: 0.8,
    }).to(window, { scrollTo: 0, duration: 0 });
    } else {
    tl.to(transition.menu, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      ease: "expo.inOut",
      duration: 1.2,
    }, 0).to(childElements, {
      opacity: 0,
      filter: 'blur(20px)',
      ease: "expo.inOut",
      duration: 1.2,
    }, 0).to(transition.cursor, {
      opacity: 0,
      duration: 0.8,
    }).to(window, { scrollTo: 0, duration: 0 });;
  }

  });
}; 

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const leaveTransition = () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuCopy = document.querySelector(".menu-copy");
  const menuOpenText = document.querySelector(".close-text");
  const menuCloseText = document.querySelector(".open-text");
  menuToggle.classList.remove("opened");
  menuToggle.classList.add("closed");
  menuCloseText.classList.remove("hide");
  menuOpenText.classList.remove("show");
  menuCopy.classList.remove("move");
  setTimeout(() => {
    window.location.reload();
  }, 200)
};

barba.init({
  transitions: [
    {
      async leave() {
        await enterTransition();
      },
      async enter() {
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
    delay: 0.5,
    onComplete: () => {
      setTimeout(() => {
        initHeader()
        heroAnim()
      }, 500)
    }
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
  }, 500);
}

// Trigger preload animation
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
    localStorage.setItem("hasVisitedBefore", "true");
  } else {
    initHeader()
    heroAnim()
  }

});

// Cursor animation 
const cursorElement = document.querySelector('.cursor-follow');
const hoverLinks = document.querySelectorAll('.hover-link, a');
const hoverLinksText = document.querySelectorAll('.show-text-trigger');
const text = document.querySelector(".desc-text");
const popup = document.querySelector(".popup-wrapper");

// Add mousemove event listener
document.addEventListener('mousemove', (e) => {
  cursorElement.classList.add('show')
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  gsap.to(cursorElement, {
      duration: 0.3, 
      ease: "power2.out", 
      x: e.clientX - cursorElement.offsetWidth / 2,  
      y: e.clientY - cursorElement.offsetHeight / 2,
    });
  });

  hoverLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(cursorElement, {
          duration: 0.3,
          width: '68px',
          height: '48px',
          ease: "power2.out"    // Smooth easing
      });
      cursorElement.classList.add('hover-active');
    });
    
    link.addEventListener('mouseleave', () => {
      // Reset cursor back to normal when not hovering
      gsap.to(cursorElement, {
        duration: 0.3,
        scale: 1,  
        width: '34px',         
        height: '28px',         
        rotation: 0,          // Reset rotation
        ease: "power2.out"    // Smooth easing
      });
      cursorElement.classList.remove('hover-active');
  });
});

let split = new SplitText(text, {
  type: "lines,words,chars"
});

if (text) {
gsap.set(split.chars, {     
  filter: "blur(10px)",  
  autoAlpha: 0,       
});
}


hoverLinksText.forEach(link => {
  link.addEventListener('mouseenter', () => {
      gsap.to(popup, {
        duration: 0.2,
        ease: "power3.out",
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      });
      gsap.to(split.chars, {
        autoAlpha: 1,
        duration: 0.1,
        filter: "blur(0px)",
        ease: "power3",
        scale:1,
        stagger: 0.01,
        delay: 0.4
      });
      cursorElement.classList.add('hide');
    });
    
    link.addEventListener('mouseleave', () => {
      cursorElement.classList.remove('hide');
      gsap.killTweensOf(split.chars);
      gsap.to(popup, {
        duration: 0.2,
        ease: "power3.out",
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        onComplete: () => {
          gsap.to(split.chars, {
            autoAlpha: 0,       
            filter: "blur(10px)",  
            duration: 0.1,
            delay: 0.3
          });
        }
      });
      gsap.to(cursorElement, {
        duration: 0.3,
        scale: 1,  
        width: '34px',         
        height: '28px',         
        rotation: 0,         
        ease: "power2.out"   
      });
  
    });
});

// Hero animation 
function heroAnim() {

  const animEl =  document.querySelector('.item__image-wrap');
  if (animEl) {
    gsap.to('.item__image-wrap', {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4",
        duration: 1.2,
        delay: 0.5,
        scaleY: 1,
    })
    gsap.to('.item__caption', {
        ease: "power4",
        duration: 1,
        autoAlpha: 1,
        delay: 1.2,
        y: 0,
        filter: "blur(0px)",
    })
  }
} 
// Header anit
function initHeader() {

  const transition = {
    menu: document.querySelector('.menu'),
    main: document.querySelector('main'),
    header: document.querySelector('header'),
  };
  window
  gsap.to(transition.main, {
    opacity: 1,
    ease: "expo.inOut",
    duration: 1.5,
  })
  gsap.to(transition.menu, {
    opacity: 1,
    ease: "expo.inOut",
    duration: 1.5,
  })
  gsap.to(transition.header, {
    opacity: 1,
    ease: "expo.inOut",
    duration: 1.5,
  })

  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const menuCopy = document.querySelector(".menu-copy");
  const menuOpenText = document.querySelector(".close-text");
  const menuCloseText = document.querySelector(".open-text");
  const links = document.querySelectorAll(".link");
  const main = document.querySelector("main");
  const socialLinks = document.querySelectorAll(".socials a");
  let isAnimating = false;

  var splitTitle = new SplitText(".logo-heading h2", { type: "chars" });

  document.addEventListener('click', function(event) {
    
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
      menuToggle.classList.remove("opened");
      menuToggle.classList.add("closed");
      menuCloseText.classList.remove("hide");
      menuOpenText.classList.remove("show");
      menuCopy.classList.remove("move");
      isAnimating = true;
      
      gsap.to(menu, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        ease: "expo.inOut",
        duration: 1.5,
        onStart: () => {
          setTimeout(() => {
            main.classList.remove("bg-blur");
          }, 500)
        },
        onComplete: () => {
          menu.style.pointerEvents = "none";
          gsap.to(menu, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
          gsap.to(links, { y: 30, opacity: 0 });
          gsap.to(socialLinks, { y: 30, opacity: 0 });
          gsap.to(splitTitle.chars, {
            y: 500,
            scale: 0.8,
          });
          isAnimating = false;
        },
      });
    }
  });
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      
      menuToggle.classList.remove("opened");
      menuToggle.classList.add("closed");
      menuCloseText.classList.remove("hide");
      menuOpenText.classList.remove("show");
      menuCopy.classList.remove("move");
      isAnimating = true;
      
      gsap.to(menu, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        ease: "expo.inOut",
        duration: 1.5,
        onStart: () => {
          setTimeout(() => {
            main.classList.remove("bg-blur");
          }, 500)
        },
        onComplete: () => {
          menu.style.pointerEvents = "none";
          gsap.to(menu, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
          // document.querySelector(".video-wrapper").classList.remove("inner-border-active")
          gsap.to(links, { y: 30, opacity: 0 });
          gsap.to(socialLinks, { y: 30, opacity: 0 });
          gsap.to(splitTitle.chars, {
            y: 500,
            scale: 0.8,
          });
          isAnimating = false;
        },
      });

    }
  })

  gsap.set(menu, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });
  gsap.set(links, { y: 30, opacity: 0 });
  gsap.set(socialLinks, { y: 30, opacity: 0 });
  gsap.set(splitTitle.chars, {
    y: 500,
    scale: 0.8,
  });

  menuToggle.addEventListener("click", () => {

    if (isAnimating) return;

    if (menuToggle.classList.contains("closed")) {
      menuToggle.classList.remove("closed");
      menuCloseText.classList.add("hide");
      menuOpenText.classList.add("show");
      menuCopy.classList.add("move");
      isAnimating = true;

      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "expo.inOut",
        duration: 1.5,
        onStart: () => {
          menu.style.pointerEvents = "all";
          main.classList.add("bg-blur");
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

      // Animate header text rotation
      
      gsap.to(splitTitle.chars, {
        y: 0,
        rotateY: 0,
        scale: 1,
        stagger: 0.05,
        delay: 0.75,
        duration: 1.5,
        ease: "power4.out",
        
      });
    } else {
      menuToggle.classList.remove("opened");
      menuToggle.classList.add("closed");
      menuCloseText.classList.remove("hide");
      menuOpenText.classList.remove("show");
      menuCopy.classList.remove("move");
      
      isAnimating = true;

      gsap.to(menu, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        ease: "expo.inOut",
        duration: 1.5,
        onStart: () => {
          setTimeout(() => {
            main.classList.remove("bg-blur");
          }, 500)
        },
        onComplete: () => {
          menu.style.pointerEvents = "none";
          gsap.to(menu, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
          gsap.to(links, { y: 30, opacity: 0 });
          gsap.to(socialLinks, { y: 30, opacity: 0 });
          gsap.to(splitTitle.chars, {
            y: 500,
            scale: 0.8,
          });
          isAnimating = false;
        },
      });
    }
    
  });

}
document.addEventListener("DOMContentLoaded", function () {
const aboutPage = document.querySelector("#about");

if (aboutPage) {

  var topOffset = 35;

  function animateParagraph(paragraphSelector, imageSelector) {
    const textDesc = document.querySelector(paragraphSelector);
  
    if (!textDesc) return;
  
    let splitDesc = new SplitText(textDesc, {
      type: "words,chars"
    });
  
    gsap.set(splitDesc.words, {     
      filter: "blur(10px)",  
      autoAlpha: 0,     
      opacity: 0 
    });
  
    gsap.to(splitDesc.words, {
      filter: "blur(5px)",  
      autoAlpha: 1,
      opacity: 0,   
      stagger: 0.05,  
      delay: 0.5,
    });
  
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: paragraphSelector,
        start: "top 50%",
        end: "bottom 50%",
        pin: true,
        pinSpacing: true,
        scrub: 0.5, // Smooth scrolling effect
        markers: false
      }
    });
    
    timeline
      .to(splitDesc.words, {
        filter: "blur(0px)",
        stagger: 0.1,
      })
      .fromTo(
        splitDesc.chars,
        { opacity: 0 },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.2,
        },
        0
      )
      .fromTo(
        imageSelector,
        {
          top: "150%", // Start slightly below the current offset
          scaleY: 2,
          filter: "blur(10px)",
        },
        {
          top: `${topOffset}vh`, // Move it all the way up by 50vh
          scaleY: 1,
          filter: "blur(0px)",
          ease: "none", // Smooth linear motion
          scrollTrigger: {
            trigger: paragraphSelector,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 0.5, // Ensures it moves with the scroll
            markers: false, // Debug markers to verify behavior
          },
        }
      );
    
      topOffset += 5; // Increment the offset for subsequent animations
    
      
    }

  animateParagraph(".paragraph-1", ".image-1");
  animateParagraph(".paragraph-2", ".image-2");
  animateParagraph(".paragraph-3", ".image-3");
  animateParagraph(".paragraph-4", ".image-4");
  
    setTimeout(() => {
      gsap.to("canvas", { 
          scrollTrigger: {
            trigger: ".paragraph-1",
            start: "top 80%",
            scrub: 0.5, 
            markers: false, 
          },
          opacity: 0,
        });
    }, 100)
}
})