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
        
            // scale up the inner image
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
                    markers: false
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

