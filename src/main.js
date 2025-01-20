import './assets/scss/app.scss';

import $ from "jquery"

import { gsap } from "gsap";
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip.js";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin, Flip);

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
const lightbox = document.querySelector('#lightbox')
const sticky = document.querySelector('#show-text-trigger-wrapper')
const header = document.querySelector('header')

function changeColor(colorKey) {
    const color = colors[colorKey];
    document.body.style.backgroundColor = color;
    header.style.backgroundColor = color;
    if (modalBg) {
      modalBg.style.backgroundColor = color;
    }
    if (sticky) {
      sticky.style.backgroundColor = color;
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
    const savedColor = localStorage.getItem('selectedColor');
    
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        header.style.backgroundColor = savedColor;
        if (modalBg) {
          modalBg.style.backgroundColor = savedColor;
        }
        if (sticky) {
          sticky.style.backgroundColor = savedColor;
        }
        if (lightbox) {
          lightbox.style.backgroundColor = savedColor;
        }
        swither.setAttribute('fill', savedColor);
        document.documentElement.style.setProperty('--background-color', savedColor); // Update CSS variable
    }

    // Add event listeners to buttons
    document.getElementById('color1').addEventListener('click', () => changeColor('color1'));
    document.getElementById('color2').addEventListener('click', () => changeColor('color2'));
    document.getElementById('color3').addEventListener('click', () => changeColor('color3'));
    document.getElementById('color4').addEventListener('click', () => changeColor('color4'));


    const initiateAnimation = () => {
      const element = document.querySelector('#main-desc');
      if (element) {
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
      } else {
        setTimeout(initiateAnimation, 100);
      }
    };
    initiateAnimation(); 

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
};

const enterTransition = () => {

  const childElements = transition.main.querySelectorAll('*');

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
    .to(window, { scrollTo: 0, duration: 0}, ">")
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
    .to(transition.pageLabel, {  opacity: 1, duration: 0.8, filter: "blur(0px)", ease: "expo.inOut",},  ">")
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
const desc = document.querySelector("#main-desc");
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
    filter: "blur(10px)",  
    autoAlpha: 0,       
  });
}

let mdesc = new SplitText(desc, {
  type: "lines,words,chars"
});


if (desc) {

  gsap.to(mdesc.chars, {
    filter: "blur(8px)",
    opacity: 0,
    ease: "power3",
    stagger: -0.008,
    scrollTrigger: {
        trigger: ".content",
        start: "top top",
        end: "+=150px",
        scrub: 1,
        markers: true

    }
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
      gsap.to(mdesc.words, {
        duration: 0.6,
        filter: "blur(8px)",
        opacity: 0,
        ease: "power3",
        stagger: -0.04,
        delay: 0.4
      });
      cursorElement.classList.add('hide');
  });
   } else {


link.addEventListener('mouseenter', () => {
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
    gsap.to(mdesc.words, {
      duration: 0.6,
      filter: "blur(8px)",
      opacity: 0,
      ease: "power3",
      stagger: -0.04,
      delay: 0.4
    });
    cursorElement.classList.add('hide');
});

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
            delay: 0.3
          });
        }
      });
      gsap.killTweensOf(mdesc.words);
      gsap.to(mdesc.words, {
        duration: 0.6,
        filter: "blur(0px)",
        opacity: 1,
        ease: "power3",
        stagger: 0.04,
        delay: 0.4
      });
  }

  let lastScrollY = 0; 
const scrollTolerance = 50; 

link.addEventListener('mouseleave', triggerAnimation);

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (Math.abs(currentScrollY - lastScrollY) > scrollTolerance) {
    lastScrollY = currentScrollY; 
    triggerAnimation();
  }
});

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
  };

  const tlInit = gsap.timeline();

  tlInit.fromTo(transition.pageLabelInit, {
    opacity: 0,
    bottom: "50px",
    filter: "blur(10px)"
  }, {
    opacity: 1,
    bottom: "8px",
    filter: "blur(0px)",
    ease: "expo.inOut",
    duration: 1.2,
  })
  .to(transition.pageLabelInit, {
    bottom: "8px",
    opacity: 0,
    filter: "blur(10px)",
    duration: 0.6,
    onComplete: () => {
      const aboutPage = document.querySelector("#about");
      const contactPage = document.querySelector("#contacts");
      if (aboutPage || contactPage) {
        nextParticle.start();
      }
    }
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

function initHeroAnim() {

  const animEl =  document.querySelector('.item__image-wrap');
  if (animEl) {
    gsap.to('.item__image-wrap', {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4",
        duration: 1.5,
        delay: 0.5,
        scaleY: 1,
        // onComplete: () => {
          // const newDiv = document.createElement('div');
          // newDiv.className = 'h-[10vh]';
          // const mainElement = document.querySelector('main.homepage');
          // if (mainElement) {
          //     mainElement.appendChild(newDiv);
          // } 
        // }
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
    pageLabelInit: document.querySelector('.page-transition .current'),
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
  
const aboutPage = document.querySelector("#about");
const contactPage = document.querySelector("#contacts");
const galleryPage = document.querySelector("#gallery-page");
const footer = document.querySelector('.footer-fixed') 

if (aboutPage) {


    const initiateAnimation = () => {
      const element = document.querySelector('#about canvas');
      if (element) {
        const element = document.querySelector('#about canvas');
        document.addEventListener('mousemove', (e) => {
          const mouseX = e.clientX;
          const windowWidth = window.innerWidth;
          const moveX = (mouseX / windowWidth) * 20;
          gsap.to(element, {
            x: -moveX,  
            duration: 2,
            ease: "expo.Out",
          });
        });
      } else {
        setTimeout(initiateAnimation, 100); // Retry after 100ms if the element doesn't exist yet
      }
    };

    initiateAnimation();


    function resetScrollTriggers() {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
    }
    resetScrollTriggers();


  
    const isMobile = window.innerWidth <= 1025; 
    if (isMobile) { 



    let topOffset = 35;
    function animateParagraph(paragraphSelector, imageSelector) {
      
      const textDesc = document.querySelector(paragraphSelector);
      if (!textDesc) return;

      const splitDesc = new SplitText(textDesc, { type: "words,chars" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: paragraphSelector,
          start: "top 20%",
          end: "bottom 20.2%",
          pin: true,
          pinSpacing: false,
          scrub: 3,
          toggleActions: "restart pause resume pause", 
          onEnterBack: () => {
            gsap.to(textDesc, { opacity: 1, filter: "blur(0px)", duration: 0.2 });
            if (textDesc.classList.contains("last-text-desc")) {
              gsap.to(".footer-end", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
            }
          },
          onLeaveBack: () => {
            gsap.to(textDesc, { opacity: 0, filter: "blur(10px)", duration: 0.2 });
          },
          onEnter: () => {
            gsap.to(textDesc, { opacity: 1, filter: "blur(0px)", duration: 0.2 });
          },
          onLeave: () => {
            if (!textDesc.classList.contains("last-text-desc")) {
              gsap.to(textDesc, { opacity: 0, filter: "blur(10px)", duration: 0.2, immediateRender: true });
            }
            else {
              gsap.to(".footer-end", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
            }
          },
          },
      });

      // Animate text characters
      timeline.fromTo(
        splitDesc.chars,
        { opacity: 0, filter: "blur(3px)" },
        { opacity: 1, filter: "blur(0px)", stagger: 0.3}
      );

      // Animate associated image
      timeline.fromTo(
        imageSelector,
        { top: "200%", scaleY: 2, filter: "blur(10px)"},
        {
          top: `${topOffset}vh`,
          scaleY: 1,
          filter: "blur(0px)",
          ease: "linear",
          scrollTrigger: {
            trigger: paragraphSelector,
            start: "top 20%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );

      topOffset += 5; // Increment for spacing between paragraphs
    }
    
    // Animate multiple paragraphs and images
    animateParagraph(".paragraph-1", ".image-1");
    animateParagraph(".paragraph-2", ".image-2");
    animateParagraph(".paragraph-3", ".image-3");
    animateParagraph(".paragraph-4", ".image-4");
    animateParagraph(".paragraph-5", ".image-5");

      // Title wrapper animation
    gsap.fromTo("#title-wrapper", {
      scaleY: 1,
      opacity: 1,
      filter: "blur(0px)",
    }, {
      scaleY: 1.2,
      opacity: 0.2,
      filter: "blur(2px)",
      ease: "power4.out",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "0%",
        end: "+=100px",
        scrub: 1,
        markers: true
      },
    });


  } else {

    let topOffset = 35;
    function animateParagraph(paragraphSelector, imageSelector) {
      
      const textDesc = document.querySelector(paragraphSelector);
      if (!textDesc) return;

      const splitDesc = new SplitText(textDesc, { type: "words,chars" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: paragraphSelector,
          start: "top 34%",
          end: "bottom 34.2%",
          pin: true,
          pinSpacing: false,
          scrub: 3,
          toggleActions: "restart pause resume pause", 
          onEnterBack: () => {
            gsap.to(textDesc, { opacity: 1, filter: "blur(0px)", duration: 0.2 });
            if (textDesc.classList.contains("last-text-desc")) {
              gsap.to(".footer-end", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
            }
          },
          onLeaveBack: () => {
            gsap.to(textDesc, { opacity: 0, filter: "blur(10px)", duration: 0.2 });
          },
          onEnter: () => {
            gsap.to(textDesc, { opacity: 1, filter: "blur(0px)", duration: 0.2 });
          },
          onLeave: () => {
            if (!textDesc.classList.contains("last-text-desc")) {
              gsap.to(textDesc, { opacity: 0, filter: "blur(10px)", duration: 0.2, immediateRender: true });
            }
            else {
              gsap.to(".footer-end", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
            }
          },
          },
      });

      // Animate text characters
      timeline.fromTo(
        splitDesc.chars,
        { opacity: 0, filter: "blur(3px)" },
        { opacity: 1, filter: "blur(0px)", stagger: 0.3}
      );

      // Animate associated image
      timeline.fromTo(
        imageSelector,
        { top: "200%", scaleY: 2, filter: "blur(10px)"},
        {
          top: `${topOffset}vh`,
          scaleY: 1,
          filter: "blur(0px)",
          ease: "linear",
          scrollTrigger: {
            trigger: paragraphSelector,
            start: "top 34%",
            end: "bottom 34%",
            scrub: 1,
          },
        }
      );

      topOffset += 5; // Increment for spacing between paragraphs
    }
    
    // Animate multiple paragraphs and images
    animateParagraph(".paragraph-1", ".image-1");
    animateParagraph(".paragraph-2", ".image-2");
    animateParagraph(".paragraph-3", ".image-3");
    animateParagraph(".paragraph-4", ".image-4");
    animateParagraph(".paragraph-5", ".image-5");

    // Title wrapper animation
    gsap.to("#title-wrapper", {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "bottom 100%",
        end: "bottom 90%",
        scrub: 1,
      },
      left: "45%",
      scaleY: 1.2,
      opacity: 0.2,
      translateX: "-100%",
      filter: "blur(2px)",
      ease: "power4.out",
    });

  }

  // Canvas fade-out effect
  setTimeout(() => {
    gsap.to("canvas", {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "bottom 100%",
        end: "bottom 70%",
        scrub: 1,
      },
      ease: "power4.out",
      opacity: 0,
    });
  }, 2200);


}

if (contactPage) {

  lenis.scrollTo(0) 
  window.scrollTo(0, 0);

  const initiateAnimation = () => {
    const element = document.querySelector('#contacts canvas');
    if (element) {
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
    } else {
      setTimeout(initiateAnimation, 100);
    }
  };

  initiateAnimation(); 

}

if (galleryPage) {

  // Define image categories with two columns
  const imageCategories = {
    bts: {
      column1: [
        './assets/images/bts/bts-1.webp',
        './assets/images/bts/bts-2.webp',
        './assets/images/bts/bts-3.webp',
        './assets/images/bts/bts-4.webp',
        './assets/images/bts/bts-5.webp',
        './assets/images/bts/bts-8.webp',
        './assets/images/bts/bts-9.webp',
        './assets/images/bts/bts-24.webp',
        './assets/images/bts/bts-25.webp',
        './assets/images/bts/bts-10.webp',
        './assets/images/bts/bts-11.webp',
        './assets/images/bts/bts-12.webp',
        './assets/images/bts/bts-13.webp',
        './assets/images/bts/bts-15.webp',
        './assets/images/bts/bts-16.webp',
        
      ],
      column2: [
        './assets/images/bts/bts-14.webp',
        './assets/images/bts/bts-17.webp',
        './assets/images/bts/bts-18.webp',
        './assets/images/bts/bts-19.webp',
        './assets/images/bts/bts-20.webp',
        './assets/images/bts/bts-21.webp',
        './assets/images/bts/bts-22.webp',
        './assets/images/bts/bts-23.webp',
        './assets/images/bts/bts-7.webp',
        './assets/images/bts/bts-6.webp',
        './assets/images/bts/bts-26.webp',
        './assets/images/bts/bts-27.webp',
        './assets/images/bts/bts-28.webp',
      ],
    },
    children: {
      column1: [
        './assets/images/children/children3.webp',
        './assets/images/children/children4.webp',
        './assets/images/children/children5.webp',
        './assets/images/children/children6.webp',
        './assets/images/children/children1.webp',
        './assets/images/children/children7.webp',
      ],
      column2: [
        './assets/images/children/children2.webp',
        './assets/images/children/children8.webp',
        './assets/images/children/children11.webp',
        './assets/images/children/children12.webp',
        './assets/images/children/children9.webp',
        './assets/images/children/children10.webp',
      ],
    },
    interior: {
      column1: [
        './assets/images/interior/interior-1.webp',
        './assets/images/interior/interior-2.webp',
        './assets/images/interior/interior-3.webp',
        './assets/images/interior/interior-4.webp',
        './assets/images/interior/interior-5.webp',
        './assets/images/interior/interior-6.webp',
        './assets/images/interior/interior-7.webp',
        './assets/images/interior/interior-8.webp',
        './assets/images/interior/interior-9.webp',
        './assets/images/interior/interior-10.webp',
      ],
      column2: [
        './assets/images/interior/interior-11.webp',
        './assets/images/interior/interior-12.webp',
        './assets/images/interior/interior-13.webp',
        './assets/images/interior/interior-14.webp',
        './assets/images/interior/interior-15.webp',
        './assets/images/interior/interior-16.webp',
        './assets/images/interior/interior-17.webp',
        './assets/images/interior/interior-18.webp',
        './assets/images/interior/interior-19.webp',
        './assets/images/interior/interior-20.webp',
      ],
    },
    event: {
      column1: [
        './assets/images/events/events-1.webp',
        './assets/images/events/events-2.webp',
        './assets/images/events/events-3.webp',
        './assets/images/events/events-4.webp',
        './assets/images/events/events-5.webp',
        './assets/images/events/events-6.webp',
        './assets/images/events/events-13.webp',
        './assets/images/events/events-14.webp',
        './assets/images/events/events-15.webp',
      ],
      column2: [
     
        './assets/images/events/events-17.webp',
        './assets/images/events/events-16.webp',
        './assets/images/events/events-7.webp',
        './assets/images/events/events-8.webp',
        './assets/images/events/events-9.webp',
        './assets/images/events/events-10.webp',
        './assets/images/events/events-11.webp',
        './assets/images/events/events-12.webp',
      ],
    },
    black_and_white: {
      column1: [
        './assets/images/b&w/b&w11.webp',
        './assets/images/b&w/b&w22.webp',
        './assets/images/b&w/b&w3.webp',
        './assets/images/b&w/b&w4.webp',
        './assets/images/b&w/b&w5.webp',
        './assets/images/b&w/b&w6.webp',
        './assets/images/b&w/b&w17.webp',
        './assets/images/b&w/b&w8.webp',
        './assets/images/b&w/b&w9.webp',
        './assets/images/b&w/b&w10.webp',
        './assets/images/b&w/b&w1.webp',
        './assets/images/b&w/b&w12.webp',
      ],
      column2: [
        './assets/images/b&w/b&w14.webp',
        './assets/images/b&w/b&w15.webp',
        './assets/images/b&w/b&w13.webp',
        './assets/images/b&w/b&w7.webp',
        './assets/images/b&w/b&w18.webp',
        './assets/images/b&w/b&w19.webp',
        './assets/images/b&w/b&w20.webp',
        './assets/images/b&w/b&w21.webp',
        './assets/images/b&w/b&w22.webp',
        './assets/images/b&w/b&w23.webp',
        './assets/images/b&w/b&w24.webp',
        './assets/images/b&w/b&w16.webp',
      ],
    },
    abstract: {
      column1: [
        './assets/images/abstract/abstract3.webp',
        './assets/images/abstract/abstract6.webp',
        './assets/images/abstract/abstract16.webp',
        './assets/images/abstract/abstract1.webp',
        './assets/images/abstract/abstract2.webp',
        './assets/images/abstract/abstract4.webp',
        './assets/images/abstract/abstract5.webp',
        './assets/images/abstract/abstract15.webp',
      ],
      column2: [
        './assets/images/abstract/abstract9.webp',
        './assets/images/abstract/abstract7.webp',
        './assets/images/abstract/abstract13.webp',
        './assets/images/abstract/abstract11.webp',
        './assets/images/abstract/abstract10.webp',
        './assets/images/abstract/abstract14.webp',
        './assets/images/abstract/abstract8.webp',
        './assets/images/abstract/abstract12.webp',
      ],
    },
  };

const triggerFilterMobile = document.getElementById('mobile-filter-categories') 
const filters = document.querySelector('.filters') 

triggerFilterMobile.addEventListener('click', () => {
gsap.to('.mobile-filter-categories', {
  filter: "blur(10px)",
  opacity: 0,
  duration: 0.6,
  pointerEvents: "none",
  ease: "power4",
  })
gsap.to('.filters', {
  x: 0,
  duration: 0.6,
  ease: "power4",
  delay: 0.2
})

})

const isMobile = window.innerWidth <= 1025; 
if (isMobile) { 

  document.addEventListener('click', function(event) {
    if (!filters.contains(event.target)  && !triggerFilterMobile.contains(event.target) ) {
      gsap.to('.filters', {
        x: 150,
        duration: 0.6,
        ease: "power4",
        delay: 0
      })
      gsap.to('.mobile-filter-categories', {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.6,
        ease: "power4",
        pointerEvents: "all",
        delay: 0.2
        })
    }
  });

}

  // Get references to elements
  const filterButtons = document.querySelectorAll('.filters a');

  // Add click event to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      // Get category from clicked button
      const category = button.dataset.category;

      // Update URL with the selected category
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('category', category);
      window.history.pushState({}, '', newUrl);


      lenis.scrollTo(0) 
      window.scrollTo(0, 0);

      gsap.to('.columns', {
        filter: "blur(40px)",
        opacity: 0.1,
        duration: 0.8,
        ease: "power4",
        onComplete: () => {
          loadImages(category);
        }
      }) 

    });
  });

  // Function to reinitialize GSAP with updated elements
  function reinitializeGSAP() {

    gsap.fromTo('.columns', {
      opacity: 0,
      filter: "blur(40px)",
    }, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "power4",
    })
    const isMobile = window.innerWidth <= 1025; 
    if (isMobile) { 
    gsap.to('.filters', {
      x: 150,
      duration: 0.6,
      ease: "power4",
      delay: 1
    })
    gsap.to('.mobile-filter-categories', {
      filter: "blur(0px)",
      opacity: 1,
      duration: 0.6,
      ease: "power4",
      pointerEvents: "all",
      delay: 1.2
    })

    }

    const column2 = document.querySelector(".column-2");
    if (!column2) return;

    // Calculate heights
    const elementHeight = column2.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    const totalTranslateY = elementHeight - viewportHeight - 16;

    // Kill previous animations
    gsap.killTweensOf(column2);

    // Set and animate column2 with updated values
    gsap.set(column2, { y: -totalTranslateY });
    gsap.to(column2, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        markers: false,
      },
      y: totalTranslateY,
      ease: "linear", 
      
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
  }

  // Function to load images dynamically with equal distribution
  function loadImages(category) {
    const columns = document.querySelectorAll(".columns .column");
    if (columns.length < 2) return;
  
    // Clear existing images
    columns.forEach((column) => (column.innerHTML = ""));
  
    // Get images for the selected category
    const columnData = imageCategories[category];
    if (!columnData) return;
  
    // Track loaded images
    let imagesToLoad = 0; // Total images to load
    let imagesLoaded = 0; // Images that have been loaded
  
    // Function to check if all images are loaded
    function checkAllImagesLoaded() {
      if (imagesLoaded === imagesToLoad) {
        // All images loaded, reinitialize GSAP and recalculate heights
        reinitializeGSAP();
        refreshModal();
      }
    }
  
    // Count the total number of images to load
    imagesToLoad = columnData.column1.length + columnData.column2.length;
  
  const isMobile = window.innerWidth <= 1025; 
  if (isMobile) { 

    const allImages = [...columnData.column1, ...columnData.column2]; // Flatten the array


    // Add images to column-1 (for both mobile and desktop)
    allImages.forEach((imageSrc) => {
      const imgWrapper = document.createElement("div");
      imgWrapper.className = "img-wrapper";
  
      const wrap = document.createElement("div");
      wrap.className = "wrap";
  
      const img = document.createElement("img");
      img.className = "img hover-link";
      img.src = imageSrc;
      img.alt = category;
  
      // Increment loaded images on load
      img.onload = () => {
        imagesLoaded++;
        checkAllImagesLoaded();
      };
  
      wrap.appendChild(img);
      imgWrapper.appendChild(wrap);
      columns[0].appendChild(imgWrapper); // Append to column-1
    });


  } else {
        // Add images to column-1
        columnData.column1.forEach((imageSrc) => {
          const imgWrapper = document.createElement("div");
          imgWrapper.className = "img-wrapper";
      
          const wrap = document.createElement("div");
          wrap.className = "wrap";
      
          const img = document.createElement("img");
          img.className = "img hover-link";
          img.src = imageSrc;
          img.alt = category;
      
          // Increment loaded images on load
          img.onload = () => {
            imagesLoaded++;
            checkAllImagesLoaded();
          };
      
          wrap.appendChild(img);
          imgWrapper.appendChild(wrap);
          columns[0].appendChild(imgWrapper); // Append to column-1
        });
      
        // Add images to column-2
        columnData.column2.forEach((imageSrc) => {
          const imgWrapper = document.createElement("div");
          imgWrapper.className = "img-wrapper hover-link";
      
          const wrap = document.createElement("div");
          wrap.className = "wrap";
      
          const img = document.createElement("img");
          img.className = "img hover-link";
          img.src = imageSrc;
          img.alt = category;
      
          // Increment loaded images on load
          img.onload = () => {
            imagesLoaded++;
            checkAllImagesLoaded();
          };
      
          wrap.appendChild(img);
          imgWrapper.appendChild(wrap);
          columns[1].appendChild(imgWrapper); // Append to column-2
        });

  }
  }
  
  // Check URL for category on page load
  function loadCategoryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'bts'; // Default category
    const activeButton = [...filterButtons].find(btn => btn.dataset.category === category);
    
    if (activeButton) {
      activeButton.classList.add('active');
    }

    loadImages(category);
  }

  // Lightbox funcs 
  function refreshModal() {
  // Modal 
  const gridItems = document.querySelectorAll(".img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");
  const prevButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");

  let currentIndex = 0;
  let images = [];

    // Populate the images array
    gridItems.forEach((item, index) => {
        const imageUrl = item.src
        images.push(imageUrl);
        // Click event to open the lightbox
        item.addEventListener("click", () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightboxImage.src = images[currentIndex];
        lightbox.classList.add("show");
        setTimeout(() => {
          lightbox.classList.add("opened");
        }, 10)
        updateLightboxImage();
    }

    function closeLightbox() {
        lightbox.classList.remove("show");
        lightbox.classList.remove("opened");
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentIndex];
        updateLightboxImage();
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImage.src = images[currentIndex];
        updateLightboxImage();
    }

    function updateLightboxImage() {
      lightboxImage.src = images[currentIndex];
  }

    // Event listeners for controls
    closeButton.addEventListener("click", closeLightbox);
    prevButton.addEventListener("click", showPrevImage);
    nextButton.addEventListener("click", showNextImage);
    

    document.addEventListener('click', function(event) {
        if (!lightbox.contains(event.target) && lightbox.classList.contains("opened")) {
          closeLightbox();
        }
      })

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("show")) return;
        if (e.key === "ArrowLeft") showPrevImage();
        if (e.key === "ArrowRight") showNextImage();
        if (e.key === "Escape") closeLightbox();
    });
  }
  
    loadCategoryFromURL(); // Load images based on URL parameter on page load

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
      gsap.to(".footer-fixed", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"});
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

