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

const lenis = new Lenis({
  duration: 1.2, // Slightly increase duration for smoother easing
  infinite: false, // Ensure looping is smooth
  smoothWheel: true, // Smooth scrolling for mouse wheel
  smoothTouch: false, // Ensure smoothness for touch devices
});

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

const buttons = $(".color-switcher button")
$(".color-switcher").mouseenter(function() {
  if (gsap.isTweening(buttons)) return;
      gsap.timeline()
      .to(buttons, { opacity: 1, width: "auto", margin: '0 4px', rotate: -45, filter: "blur(0)", duration: 0.1, stagger: -0.04  }) 
});
$(".color-switcher").mouseleave(function() {
  setTimeout(() => {
    gsap.timeline()
    .to(buttons, { opacity: 0, width: "0", rotate: 0, margin: '0 0', filter: "blur(5px)", duration: 0.1, stagger: 0.04 });
  }, 200)
});

// Predefined colors
const colors = {
    color1: '#000000', 
    color2: '#121619', 
    color3: '#141D29',  
    color4: '#1F1F1F' 
};

// Function to change background color and store in localStorage
const modalBg = document.querySelector('#popup-wrapper')
const swither = document.querySelector('#fill-color')

function changeColor(colorKey) {
    const color = colors[colorKey];
    document.body.style.backgroundColor = color;
    if (modalBg) {
      modalBg.style.backgroundColor = color;
    }
    swither.setAttribute('fill', color);
    document.documentElement.style.setProperty('--background-color', color); // Update CSS variable
    localStorage.setItem('selectedColor', color); // Save the selected color
}

// Restore saved color on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('selectedColor');
    
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        if (modalBg) {
          modalBg.style.backgroundColor = savedColor;
        }
        swither.setAttribute('fill', savedColor);
        document.documentElement.style.setProperty('--background-color', savedColor); // Update CSS variable
    }

    // Add event listeners to buttons
    document.getElementById('color1').addEventListener('click', () => changeColor('color1'));
    document.getElementById('color2').addEventListener('click', () => changeColor('color2'));
    document.getElementById('color3').addEventListener('click', () => changeColor('color3'));
    document.getElementById('color4').addEventListener('click', () => changeColor('color4'));
});

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
};

const enterTransition = (data) => {

  const childElements = transition.main.querySelectorAll('*');

  const menuToggle = document.querySelector(".menu-toggle");

    // Get the text of the clicked link
    const clickedLink = data.trigger; // The element that triggered the transition

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    });
    const menuToggle = document.querySelector(".menu-toggle");

    if (menuToggle.classList.contains("closed")) {

    tl.to(transition.body, { backgroundColor: "#000000", duration: 0.4, ease: "expo.inOut",})
    .to(childElements, {
      opacity: 0,
      // filter: 'blur(20px)',
      ease: "expo.inOut",
      duration: 1,
    }, 0)
    .to(transition.pageLabel, {  opacity: 1, duration: 0.8, filter: "blur(0px)", ease: "expo.inOut",}, ">")
    .to(transition.swither, {
      opacity: 0,
      filter: 'blur(20px)',
      ease: "expo.inOut",
      duration: 1,
    }, 0)
    .to(transition.header, { filter: "blur(10px)",  opacity: 0, duration: 0.6, ease: "expo.inOut",}, 0)
    .to(transition.cursor, {
      opacity: 0,
      duration: 1,
    }, 0)
    .to("footer", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", duration: 0.6 }, 0)
    .to(transition.pageLabel, {  bottom: "-100px", duration: 0.6, ease: "expo.inOut",})
    .to(window, { scrollTo: 0, duration: 0 }, ">")
    } else {
      tl.to(transition.body, { backgroundColor: "#000000", duration: 0.4, ease: "expo.inOut",
      }, 0)
      .to(transition.menu, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        ease: "expo.inOut",
        duration: 1,
      }, 0)
      .to(childElements, {
        opacity: 0,
        // filter: 'blur(20px)',
        ease: "expo.inOut",
        duration: 1,
      }, 0)
    .to(transition.pageLabel, {  opacity: 1, duration: 0.6, filter: "blur(0px)", ease: "expo.inOut",},  ">")
    .to(transition.swither, {
      opacity: 0,
      filter: 'blur(20px)',
      ease: "expo.inOut",
      duration: 1,
    }, 0)
    .to(transition.header, { filter: "blur(10px)", opacity: 0, duration: 0.6, ease: "expo.inOut",}, 0)
    .to(transition.cursor, {
      opacity: 0,
      duration: 1,
    }, 0)
    .to("footer", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", duration: 0.6 }, 0)
    .to(transition.pageLabel, {  bottom: "-100px", duration: 0.6, ease: "expo.inOut",})
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

// Listen for the page reload event
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);  
});

document.addEventListener("DOMContentLoaded", function () {
  if (performance.navigation.type === 1) {
    window.scrollTo(0, 0);
  }
});

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
        initHeader()
        heroAnim()
      }, 1000)
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

// Cursor hover animation 
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

// Hero animation / Homepage
function heroAnim() {

  const animEl =  document.querySelector('.item__image-wrap');
  if (animEl) {
    gsap.to('.item__image-wrap', {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4",
        duration: 1.2,
        delay: 2.5,
        scaleY: 1,
    })
    gsap.to('.item__caption', {
        ease: "power4",
        duration: 1,
        autoAlpha: 1,
        delay: 3,
        y: 0,
        filter: "blur(0px)",
    })
    setTimeout(() => {
      const newDiv = document.createElement('div');
      newDiv.className = 'h-[10vh]';
      const mainElement = document.querySelector('main.homepage');
      if (mainElement) {
          mainElement.appendChild(newDiv);
      } 
    }, 3000)
  }
} 

// Header anit
function initHeader() {

  const transition = {
    menu: document.querySelector('.menu'),
    main: document.querySelector('main'),
    swither: document.querySelector('.color-switcher'),
    header: document.querySelector('header'),
    pageLabelInit: document.querySelector('.page-transition .current'),
  };

  const tlInit = gsap.timeline();

  tlInit.fromTo(transition.pageLabelInit, {
    opacity: 0,
    bottom: "100px",
    filter: "blur(10px)"
  }, {
    opacity: 1,
    bottom: "0px",
    filter: "blur(0px)",
    ease: "expo.inOut",
    duration: 1,
  })
  .to(transition.pageLabelInit, {
    bottom: "0px",
    opacity: 0,
    filter: "blur(10px)",
    duration: 0.6,
  }, 1.2)
  .to(transition.main, {
    opacity: 1,
    ease: "expo.inOut",
    duration: 1.2,
  })
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
          main.classList.add("bg-blur-remove");
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
          main.classList.remove("bg-blur-remove");
        },
      });
    }
    
  });

}

// About / Contact page
document.addEventListener("DOMContentLoaded", function () {

// const title = document.querySelector(".anim-title");
//   if (title) {
//     const title = document.querySelector(".anim-title");
//     gsap.to(title, {
//       ease: "power4",
//       duration: 1,
//       autoAlpha: 1,
//       delay: 1,
//       filter: "blur(0px)",
//   })
// }
  
const aboutPage = document.querySelector("#about");
const contactPage = document.querySelector("#contacts");

if (aboutPage) {
  setTimeout(() => {
    nextParticle.start();
  }, 2100)
  function resetScrollTriggers() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ScrollTrigger.refresh();
  }

    resetScrollTriggers();

  var topOffset = 35;

  function animateParagraph(paragraphSelector, imageSelector) {
    const textDesc = document.querySelector(paragraphSelector);

    if (!textDesc) return;

    let splitDesc = new SplitText(textDesc, { type: "words,chars" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: paragraphSelector,
        start: "top 34%",
        end: "bottom 32%",
        pin: true,
        pinSpacing: false,
        scrub: true,
        markers: false,
        stagger: 2,
        toggleActions: "restart pause resume pause", 
        onEnterBack: () => {
          gsap.to(textDesc, { opacity: 1, filter: "blur(0px)", duration: 0.2 });
        },
        onLeaveBack: () => {
          gsap.to(textDesc, { opacity: 0, filter: "blur(10px)", duration: 0.2 });
        }
      },
      onStart: () => {
        gsap.to(textDesc, { opacity: 1, filter: "blur(0px)", duration: 0.2 });
      },
      onComplete: () => {
        gsap.to(textDesc, { opacity: 0, filter: "blur(10px)", duration: 0.1 });
      }
    });

      // Characters animation
    timeline.fromTo(
      splitDesc.chars,
      { opacity: 0, filter: "blur(2px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.2,
        duration: 2.5,
      },
      0
    ).fromTo(
      imageSelector,
      {
        top: "150%", 
        scaleY: 2,
        filter: "blur(10px)",
      },
      {
        top: `${topOffset}vh`, 
        scaleY: 1,
        filter: "blur(0px)",
        ease: "none", 
      scrollTrigger: {
        trigger: paragraphSelector,
        start: "top 34%",
        end: "bottom 34%",
        scrub: true, 
        markers: false, 
        },
      }
    );

    topOffset += 5;
  }

  animateParagraph(".paragraph-1", ".image-1");
  animateParagraph(".paragraph-2", ".image-2");
  animateParagraph(".paragraph-3", ".image-3");
  animateParagraph(".paragraph-4", ".image-4");

  gsap.set(".footer-end", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });

    ScrollTrigger.create({
      trigger: '.image-4',
      start: 'center bottom', 
      end: 'center bottom',
      markers: true,
      scrub: 1,
      onEnter: () => {
        gsap.to(".footer-end", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
      },
      onEnterBack: () => {
        gsap.to(".footer-end", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
      }
    });

    gsap.to("canvas", { 
      scrollTrigger: {
        trigger: document.documentElement,
        start: "bottom 100%",
        end: "bottom 90%",
        scrub: 1, 
        markers: false, 
      },
      ease: "power4.out",
      opacity: 0,
    });

    gsap.to("#title-wrapper", { 
      scrollTrigger: {
        trigger: document.documentElement,
        start: "bottom 100%",
        end: "bottom 90%",
        scrub: 1, 
        markers: false, 
      },
      left: "45%",
      scaleY: 1.2,
      opacity: 0.2,
      translateX: "-100%",
      filter: "blur(2px)",
      ease: "power4.out",
    });

}



if (contactPage) {
  setTimeout(() => {
    nextParticle.start();
  }, 2100)
  const element = document.querySelector('#contacts canvas');
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const moveX = (mouseX / windowWidth) * 20;
    const moveY = (mouseY / windowHeight) * 20;
    gsap.to(element, {
      x: -moveX,  
      y: -moveY, 
      duration: 2,
      ease: "expo.Out",
    });
  });
}

// Footer animation 
const footer = document.querySelector('.footer-fixed') 

if (footer) {

  ScrollTrigger.create({
    trigger: 'body', 
    start: 'bottom bottom',
    end: 'bottom+=1 bottom',
    markers: true,
    scrub: 1,
    onEnter: () => {
      gsap.to(".footer-fixed", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"});
      gsap.to(".show-text-trigger", { translateY: "60px"});
    },
    onEnterBack: () => {
      gsap.to(".footer-fixed", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"});
      gsap.to(".show-text-trigger", { translateY: "0px"});
    }
  });

}


})

