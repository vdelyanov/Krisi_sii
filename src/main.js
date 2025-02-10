import './assets/scss/app.scss';

import $ from "jquery"

import { gsap } from "gsap";
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip.js";

// import { Gradient } from "https://gist.githack.com/jordienr/64bcf75f8b08641f205bd6a1a0d4ce1d/raw/35a5c7c1ddc9f97ec84fe7e1ab388a3b726db85d/Gradient.js";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin, Flip);

import CookieBox from "./CookieBox.js";
const cookieBox = new CookieBox("#cookie-box");

import barba from '@barba/core';
import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 1.6, // Slightly increase duration for smoother easing
  infinite: false, // Ensure looping is smooth
  smoothWheel: true, // Smooth scrolling for mouse wheel
  smoothTouch: true, // Ensure smoothness for touch devices
});

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


// Color switcher
const buttons = $(".color-switcher button")
$(".color-switcher").mouseenter(function() {
  if (gsap.isTweening(buttons)) return;
      gsap.timeline()
      .to(buttons, { opacity: 1, width: "auto", margin: '0 4px', rotate: -45, filter: "blur(0)", duration: 0.1, stagger: -0.04  }) 
});
$(".color-switcher").mouseleave(function() {
  setTimeout(() => {
    gsap.timeline()
    .to(buttons, { opacity: 0, width: "0", rotate: 0, margin: '0 0', filter: "blur(4px)", duration: 0.1, stagger: 0.04 });
  }, 200)
});

// Predefined colors
const colors = {
    // color1: '#000000', 
    color2: '#121619', 
    color4: '#292929',
    color3: '#1B2737',  
};

// Function to change background color and store in localStorage
const modalBg = document.querySelector('#popup-wrapper')
const swither = document.querySelector('#fill-color')
const lightbox = document.querySelector('#lightbox')
const sticky = document.querySelector('#show-text-trigger-wrapper')
const header = document.querySelector('header')

function changeColor(colorKey) {
    const color = colors[colorKey];
    document.body.style.backgroundColor = color;
      // header.style.backgroundColor = color;
      // header.style.background = `linear-gradient(to bottom, ${color} 0%, transparent 100%)`
    if (modalBg) {
      modalBg.style.backgroundColor = color;
    }
    if (sticky) {
      // sticky.style.backgroundColor = color;
      // sticky.style.background = `linear-gradient(to top, ${color} 0%, transparent 100%)`
    }
    if (lightbox) {
      lightbox.style.backgroundColor = color;
    }
    swither.setAttribute('fill', color);
    document.documentElement.style.setProperty('--background-color', color); // Update CSS variable
    localStorage.setItem('selectedColor', color); // Save the selected color
}

// Restore saved color on page load

document.addEventListener('DOMContentLoaded', () => {

  // const gradient = new Gradient()
  // gradient.initGradient('#gradient-canvas')

    const savedColor = localStorage.getItem('selectedColor');
    
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        // header.style.backgroundColor = savedColor;
        // header.style.background = `linear-gradient(to bottom, ${savedColor} 0%, transparent 100%)`
        if (modalBg) {
          modalBg.style.backgroundColor = savedColor;
        }
        if (sticky) {
          // sticky.style.backgroundColor = savedColor;
          // sticky.style.background = `linear-gradient(to top, ${savedColor} 0%, transparent 100%)`
        }
        if (lightbox) {
          lightbox.style.backgroundColor = savedColor;
        }
        swither.setAttribute('fill', savedColor);
        document.documentElement.style.setProperty('--background-color', savedColor); // Update CSS variable
    }

    // Add event listeners to buttons
    // document.getElementById('color1').addEventListener('click', () => changeColor('color1'));
    document.getElementById('color2').addEventListener('click', () => changeColor('color2'));
    document.getElementById('color3').addEventListener('click', () => changeColor('color3'));
    document.getElementById('color4').addEventListener('click', () => changeColor('color4'));

});

// Scroll icon 
document.addEventListener("DOMContentLoaded", function () {
  const scrollIcon = document.getElementById('scroll-icon');
    if (scrollIcon) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          scrollIcon.classList.add('hide');
        } else {
          scrollIcon.classList.remove('hide');
        }
      });
    }
});

// Page Transiiton  
const transition = {
  main: document.querySelector('main'),
  menu: document.querySelector('.menu'),
  header: document.querySelector('header'),
  cursor: document.querySelectorAll('.cursor-follow svg'),
  swither: document.querySelectorAll('.color-switcher'),
  body: document.querySelector('body'),
  pageLabel: document.querySelector('.page-transition .current'),
  // gradient: document.querySelector('#gradient-canvas'),
  // gradient: document.querySelector('.gradient-bg'),
  noise: document.querySelector('#noise-bg'),
  cookieBox: document.querySelector('#cookie-box'),
};

const enterTransition = () => {
  const childElements = transition.main.querySelectorAll('*');
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    });
    const menuToggle = document.querySelector(".menu-toggle");

    if (menuToggle.classList.contains("closed")) {
    tl.to(transition.body, { backgroundColor: "#121619", duration: 0.6, ease: "linear",})
    // .to(transition.gradient, { opacity: 0, duration: 0.6, ease: "linear",})
    .to(transition.noise, { opacity: 0, duration: 0.6, ease: "linear",})
    .to(transition.cookieBox, { bottom: -100, duration: 0.4, ease: "linear",})
    .to(childElements, {
      opacity: 0,
      ease: "expo.inOut",
      duration: 0.8,
    }, 0)
    .to(transition.pageLabel, {  opacity: 0, duration: 0, filter: "blur(0px)", ease: "expo.inOut",}, ">")
    .to(transition.swither, {
      opacity: 0,
      filter: 'blur(10px)',
      ease: "expo.inOut",
      duration: 0.6,
    }, 0)
    .to(transition.header, { filter: "blur(10px)",  opacity: 0, duration: 0.6, ease: "expo.inOut",}, 0)
    .to(transition.cursor, {
      opacity: 0,
      duration: 0.6,
    }, 0)
    .to("footer", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", duration: 0.6 }, 0)
    .to(transition.pageLabel, {  bottom: "0px", duration: 0, ease: "expo.inOut",})
    .to(window, { scrollTo: 0, duration: 0}, ">")
   
  } else {
      tl.to(transition.body, { backgroundColor: "#121619", duration: 0.6, ease: "linear",
      }, 0)
      // .to(transition.gradient, { opacity: 0, duration: 0.6, ease: "linear",})
      .to(transition.noise, { opacity: 0, duration: 0.6, ease: "linear",})
      .to(transition.cookieBox, { bottom: -100, duration: 0.4, ease: "linear",})
      .to(transition.menu, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        ease: "expo.inOut",
        duration: 0.8,
      }, 0)
      .to(childElements, {
        opacity: 0,
        ease: "expo.inOut",
        duration: 0.8,
      }, 0)
    .to(transition.pageLabel, {  opacity: 0, duration: 0, filter: "blur(0px)", ease: "linear",},  ">")
    .to(transition.swither, {
      opacity: 0,
      filter: 'blur(10px)',
      ease: "expo.inOut",
      duration: 0.6,
    }, 0)
    .to(transition.header, { filter: "blur(10px)", opacity: 0, duration: 0.6, ease: "expo.inOut",}, 0)
    .to(transition.cursor, {
      opacity: 0,
      duration: 0.6,
    }, 0)
    .to("footer", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", duration: 0.6 }, 0)
    .to(transition.pageLabel, {  bottom: "0px", duration: 0, ease: "expo.inOut",})
    .to(window, { scrollTo: 0, duration: 0 }, ">")
  }
  });
}; 

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
  }, 100)

};

barba.init({
  transitions: [
    {
      async leave(data) {
        await enterTransition(data);
      },
      async enter() {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
        leaveTransition();
      },
    },
  ],
});

document.addEventListener("DOMContentLoaded", function () {
  if (performance.navigation.type === 1) {
    window.scrollTo(0, 0);
  }
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
    span.style.filter = 'blur(2px)';
    span.style.opacity = '0.8';
    span.textContent = letter;
    item.appendChild(span);
  });
}

function fadeanim() {
  gsap.to('#preloader', {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    delay: 0.5,
    diration: 1,
    onComplete: () => {
      setTimeout(() => {
        initialInitHeader()
        initHeroAnim()
      }, 500)
    }
  });
}

function animateBlurEffect() {
  const letters = item.children;
  let index = 0;

  function clearNextLetter() {
    if (index < letters.length) {
      gsap.to(letters[index], { 
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.5 });
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
  }, 2000);
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
    lenis.scrollTo(0);
    setTimeout(() => {
      window.scrollTo(0, 0);
      heroAnim();
    }, 500);
  }

});

// Cursor animation 
const cursorElement = document.querySelector('.cursor-follow');
const hoverLinksText = document.querySelectorAll('.show-text-trigger');
const text = document.querySelector(".desc-text");
const popup = document.querySelector(".popup-wrapper");

// Add mousemove event listener
document.addEventListener('mousemove', (e) => {
  cursorElement.classList.add('show')
  gsap.to(cursorElement, {
      duration: 0.3, 
      ease: "power2.out", 
      x: e.clientX - cursorElement.offsetWidth / 2,  
      y: e.clientY - cursorElement.offsetHeight / 2,
    });
});

setTimeout(() => {

const hoverLinks = document.querySelectorAll('.hover-link, a');

  hoverLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(cursorElement, {
          duration: 0.3,
          width: '68px',
          height: '48px',
          ease: "power2.out"  
      });
      cursorElement.classList.add('hover-active');
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(cursorElement, {
        duration: 0.3,
        scale: 1,  
        width: '34px',         
        height: '28px',         
        rotation: 0,  
        ease: "power2.out"   
      });
      cursorElement.classList.remove('hover-active');
    });
  });


}, 500);


let split = new SplitText(text, {
  type: "lines,words,chars"
});

if (text) {
  gsap.set(split.words, {     
    filter: "blur(5px)",  
    autoAlpha: 0,       
  });
}

hoverLinksText.forEach(link => {

  const isMobile = window.innerWidth <= 1025; 
  if (isMobile) { 
    link.addEventListener('click', () => {
      gsap.to(popup, {
        duration: 0.2,
        ease: "power3.out",
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      });
      gsap.to(split.words, {
        autoAlpha: 1,
        duration: 0.2,
        filter: "blur(0px)",
        ease: "power3",
        scale:1,
        stagger: 0.02,
        delay: 0.4
      });
      cursorElement.classList.add('hide');
  });
   } else {

  link.addEventListener('mouseenter', () => {
    setTimeout(() => {
      gsap.to(link, {
        duration: 0.6,
        ease: "power3.out",
        opacity: 0,
        filter: "blur(4px)"
      });
      gsap.to(popup, {
        duration: 0.2,
        ease: "power3.out",
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      });
      gsap.to(split.words, {
        autoAlpha: 1,
        duration: 0.2,
        filter: "blur(0px)",
        ease: "power3",
        scale:1,
        stagger: 0.02,
        delay: 0.4
      });
      cursorElement.classList.add('hide');
  });
}, 100)
}

function triggerAnimation() {
    cursorElement.classList.remove('hide');
    gsap.killTweensOf(split.words);
    gsap.to(popup, {
      duration: 0.2,
      ease: "power3.out",
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      onComplete: () => {
        gsap.to(split.words, {
          autoAlpha: 0,       
          filter: "blur(8px)",  
          duration: 0.1,
          delay: 0.3,
        });
      }
    });
    gsap.to(link, {
      duration: 0.8,
      ease: "power3.out",
      opacity: 1,
      delay: 0.4,
      filter: "blur(0px)",
    });
  }

link.addEventListener('mouseleave', triggerAnimation);

if (isMobile) {
  let lastScrollY = 0; 
  const scrollTolerance = 50; 
    window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollY) > scrollTolerance) {
      lastScrollY = currentScrollY; 
      triggerAnimation();
    }
  });
}

});

// Hero animation / Homepage
function heroAnim() {

  const animEl =  document.querySelector('.item__image-wrap');
  if (animEl) {

    let logo =  document.querySelector("a.logo")
    logo.style.pointerEvents = "none";

    gsap.to('.item__image-wrap', {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4",
        duration: 1.2,
        delay: 2,
        scaleY: 1,
    })
    gsap.to('.item__caption', {
        ease: "power4",
        duration: 1,
        autoAlpha: 1,
        delay: 2.5,
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
    swither: document.querySelector('.color-switcher'),
    header: document.querySelector('header'),
    footer: document.querySelector('footer'),
    pageLabelInit: document.querySelector('.page-transition .current'),
    pageLabelInit: document.querySelector('.page-transition .current'),
    // gradient: document.querySelector('#gradient-canvas'),
    // gradient: document.querySelector('.gradient-bg'),
    noise: document.querySelector('#noise-bg'),
    cookieBox: document.querySelector('#cookie-box'),
  };

  const tlInit = gsap.timeline();

  tlInit.fromTo(transition.pageLabelInit, {
    opacity: 0,
    bottom: "0px", 
    filter: "blur(10px)",
  }, {
    opacity: 1,
    bottom: "8px",
    filter: "blur(0px)",
    ease: "expo.inOut",
    delay: 0.4,
    duration: 1.2,
  })
  .to(transition.pageLabelInit, {
    bottom: "8px",
    opacity: 0,
    filter: "blur(10px)",
    duration: 0.6,
    onStart: () => {
      const aboutPage = document.querySelector("#about");
      const contactPage = document.querySelector("#contacts");
      const homepagePage = document.querySelector("#homepage");
      if (aboutPage || contactPage || homepagePage) {
        nextParticle.start();
      }
    }
  }, 1.5)
  .to(transition.main, {
    opacity: 1,
    ease: "expo.inOut",
    duration: 1.2,
  })
  // .to(transition.gradient, { opacity: 0.2, duration: 0.8, ease: "linear",}, 0.4)
  .to(transition.noise, { opacity: 0.2, duration: 0.8, ease: "linear",}, 0.4)
  .to(transition.cookieBox, { bottom: 0, duration: 0.4, ease: "linear",})
  .to(transition.swither, {
    opacity: 1,
    ease: "expo.inOut",
    duration: 1.2,
  }, 0)
  .to(transition.menu, {
    opacity: 1,
    ease: "expo.inOut",
    duration: 1.2,
  }, 0)
  .to(transition.header, {
    opacity: 1,
    filter: "blur(0px)",
    delay: 0.4,
    ease: "expo.inOut",
    duration: 1.2,
  }, 0).to(transition.footer, {
    opacity: 1,
    autoAlpha: 1,
    delay: 1.2,
    ease: "expo.inOut",
    duration: 0.6,
  }, 0)

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


  // Close header events 
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
        duration: 1.2,
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
          main.classList.remove("bg-blur-remove");
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
        duration: 1.2,
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
          main.classList.remove("bg-blur-remove");
        },
      });

    }
  })

  // Set states of the header's elements 
  gsap.set(menu, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });
  gsap.set(links, { y: 30, opacity: 0 });
  gsap.set(socialLinks, { y: 30, opacity: 0 });
  gsap.set(splitTitle.chars, {
    y: 500,
    scale: 0.8,
  });

  // Open / close header menu 
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
        duration: 1.2,
        onStart: () => {
          menu.style.pointerEvents = "all";
          main.classList.add("bg-blur");
          main.classList.add("bg-blur-remove");
        },
        onComplete: () => {
          isAnimating = false;
        },
      });

      gsap.to(links, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(socialLinks, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });

      const tl = gsap.timeline();

      gsap.to(splitTitle.chars, {
        y: 0,
        rotateY: 0,
        scale: 1,
        stagger: 0.05,
        delay: 0.75,
        duration: 1.2,
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
        duration: 1.2,
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
          main.classList.remove("bg-blur-remove");
        },
      });
    }
    
  });

}

function initHeroAnim() {

  const animEl =  document.querySelector('.item__image-wrap');
  if (animEl) {
    gsap.to('.item__image-wrap', {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4",
        duration: 1.5,
        delay: 0.5,
        scaleY: 1,
    })
    gsap.to('.item__caption', {
        ease: "power4",
        duration: 1.5,
        autoAlpha: 1,
        delay: 1,
        y: 0,
        filter: "blur(0px)",
    })
  }
} 

function initialInitHeader() {

  const transition = {
    menu: document.querySelector('.menu'),
    main: document.querySelector('main'),
    swither: document.querySelector('.color-switcher'),
    header: document.querySelector('header'),
    footer: document.querySelector('footer'),
    pageLabelInit: document.querySelector('.page-transition .current'),
    // gradient: document.querySelector('#gradient-canvas'),
    // gradient: document.querySelector('.gradient-bg'),
    noise: document.querySelector('#noise-bg'),
    cookieBox: document.querySelector('#cookie-box'),
  };

  const tlInit = gsap.timeline();

  const aboutPage = document.querySelector("#about");
  const contactPage = document.querySelector("#contacts");
  if (aboutPage || contactPage) {
    nextParticle.start();
  }

  tlInit.to(transition.main, {
    opacity: 1,
    ease: "expo.inOut",
    duration: 1.2,
  })
  // .to(transition.gradient, { opacity: 0.2, duration: 0.8, ease: "linear"})
  .to(transition.noise, { opacity: 0.2, duration: 0.8, ease: "linear",})
  .to(transition.cookieBox, { bottom: 0, duration: 0.4, ease: "linear",})
  .to(transition.swither, {
    opacity: 1,
    ease: "expo.inOut",
    duration: 1.2,
  }, 0)
  .to(transition.menu, {
    opacity: 1,
    ease: "expo.inOut",
    duration: 1.2,
  }, 0)
  .to(transition.header, {
    opacity: 1,
    filter: "blur(0px)",
    delay: 0.4,
    ease: "expo.inOut",
    duration: 1.2,
  }, 0).to(transition.footer, {
    opacity: 1,
    autoAlpha: 1,
    delay: 1.2,
    ease: "expo.inOut",
    duration: 0.6,
  }, 0)

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


  // Close header events 
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
          main.classList.remove("bg-blur-remove");
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
          gsap.to(links, { y: 30, opacity: 0 });
          gsap.to(socialLinks, { y: 30, opacity: 0 });
          gsap.to(splitTitle.chars, {
            y: 500,
            scale: 0.8,
          });
          isAnimating = false;
          main.classList.remove("bg-blur-remove");
        },
      });

    }
  })

  // Set states of the header's elements 
  gsap.set(menu, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });
  gsap.set(links, { y: 30, opacity: 0 });
  gsap.set(socialLinks, { y: 30, opacity: 0 });
  gsap.set(splitTitle.chars, {
    y: 500,
    scale: 0.8,
  });

  // Open / close header menu 
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
          main.classList.add("bg-blur-remove");
        },
        onComplete: () => {
          isAnimating = false;
        },
      });

      gsap.to(links, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(socialLinks, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });

      const tl = gsap.timeline();

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
          main.classList.remove("bg-blur-remove");
        },
      });
    }
    
  });

}

// Pages
document.addEventListener("DOMContentLoaded", function () {
  
const homePage = document.querySelector("#homepage");
const footer = document.querySelector('.footer-fixed') 

if (homePage) {

  setTimeout(() => {
  const homepageCanvas = document.querySelector('.entry-screen > canvas') 
  gsap.to(homepageCanvas, {
    scrollTrigger: {
      trigger: ".entry-screen",
      start: "bottom 90%",
      end: "bottom 0%",
      scrub: 1,
    },
    ease: "power4.out",
    opacity: 0,
  });
  }, 2200)
  gsap.to("#title-name", {
    scrollTrigger: {
      trigger: ".entry-screen",
      start: "bottom 50%",
      end: "bottom 30%",
      scrub: 1,
    },
    ease: "power4.out",
    opacity: 0,
    filter: "blur(4px)"
  });

  gsap.to("#desc", {
    scrollTrigger: {
      trigger: ".entry-screen",
      start: "bottom 50%",
      end: "bottom 30%",
      scrub: 1,
      markers: true
    },
    ease: "power4.out",
    opacity: 0,
    filter: "blur(4px)"
  });

  gsap.to("#show-text-trigger-wrapper", {
    scrollTrigger: {
      trigger: ".entry-screen",
      start: "bottom 50%",
      end: "bottom 30%",
      scrub: 1,
    },
    ease: "power4.out",
    filter: "blur(0px)"
  });

}

if (footer)  {
  
  setTimeout(() => {
  gsap.timeline()

  ScrollTrigger.create({
    trigger: 'body', 
    start: 'bottom bottom',
    end: 'bottom+=1 bottom',
    markers: true,
    scrub: 1,
    onEnter: () => {
      gsap.to(".footer-fixed", {  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"});
      let textTrigger = document.querySelector(".show-text-trigger")
      if (textTrigger) {
        gsap.to(".show-text-trigger", { translateY: "60px"});
      }
    },
    onEnterBack: () => {
      gsap.to(".footer-fixed", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"});
      let textTrigger = document.querySelector(".show-text-trigger")
      if (textTrigger) {
      gsap.to(".show-text-trigger", { translateY: "0px"});
      }
    }
  });

}, 0)

}

})

