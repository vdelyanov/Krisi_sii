import { preloadImages } from './utils';
import { Item } from './item';  

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = [];
[...document.querySelectorAll('.item')].forEach(item => {
	items.push(new Item(item));
});

// ScrollTrigger animations for scrolling
const animateOnScroll = () => {

	for (const item of items) {

            gsap.from(item.DOM.image, {
                ease: 'none',
                scaleY: 2.4,
                opacity: 0,
                yPercent: 100,
                filter: "blur(10px)",
                scrollTrigger: {
                    trigger: item.DOM.el,
                    start: 'top 120%',
                    end: 'center 80%',
                    scrub: true,
                    markers: false,
                    onLeave: () => {
                        item.DOM.imageInnerItem.classList.add('show');
                    },
                    onEnterBack: () => {
                        item.DOM.imageInnerItem.classList.remove('show');
                    }
                }
            },)

            gsap.fromTo(item.DOM.image, {
                scaleY: 1,
                filter: "blur(0px)",
                opacity: 1,
                yPercent: 0,
           
            }, {
                ease: 'none',
                filter: "blur(10px)",
                scaleY: 2.4,
                opacity: 0,
                yPercent: -100,
                onStart: () => {
                    item.DOM.imageInnerItem.classList.remove('show');
                },
                onReverseComplete: () => {
                    item.DOM.imageInnerItem.classList.add('show');
                },
                scrollTrigger: {
                    trigger: item.DOM.el,
                    start: 'center 20%',
                    end: 'bottom 0%',
                    scrub: true,
                    markers: false
                }
            },)

            gsap.fromTo([item.DOM.title], 
            { filter: "blur(10px)",
                 yPercent: -100}, {
               scrollTrigger: {
                   trigger: item.DOM.el,
                   top: 'top -50%',
                   end: 'top 50%',
                   scrub: true,
               },
               filter: "blur(0px)",
               yPercent: 0,
           })  
    	}

};

// Preload images
preloadImages('.item__image-inner').then(() => {
    animateOnScroll();
});



// Scroll bar function
function scrollToMiddle(targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const viewportHeight = window.innerHeight;
    const offsetPosition = targetPosition - (viewportHeight * 0.3);
  
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        scrollToMiddle(targetElement);
      }
    });
  });
  

  gsap.registerPlugin(ScrollTrigger);

  const indicator = document.querySelector('.scroll-indicator');
  
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const scrollPercentage = self.progress * 90;
  
      // Apply smooth animation to the indicator
      gsap.to(indicator, {
        y: scrollPercentage, 
        duration: 0.1,
        ease: "power1.out"
      });
    }
  });

//   import Freezeframe from 'freezeframe';

//   new Freezeframe();

//   const logo = new Freezeframe('.item__image-inner', {
//   });
  
// logo.start(); 