import { gsap } from "gsap";
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

import Lenis from 'lenis'

document.addEventListener("DOMContentLoaded", function () { 

    function resetScrollTriggers() {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
    }
    resetScrollTriggers();

    const isMobile = window.innerWidth <= 1025; 
    if (isMobile) { 

          setTimeout(() => {
            gsap.to("canvas", {
              scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "+=550",
                scrub: 1,
              },
              ease: "power4.out",
              opacity: 0,
            });
          }, 2200);

          gsap.to("#about-us-title-mobile", {
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "+=150",
              scrub: 1,
            },
            ease: "power4.out",
            opacity: 0,
            filter: "blur(10px)"
          });



      function animateParagraphMobile(paragraphSelectorM, imageSelector) {

      const textDescM = document.querySelector(paragraphSelectorM);
      const splitDescM = new SplitText(textDescM, { type: "words,chars,lines" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: paragraphSelectorM,
          start: "top 100%",
          end: "bottom 80%",
          pin: false,
          pinSpacing: false,
          scrub: 2,
          },

      });

      // Animate text characters
      timeline.fromTo(
        splitDescM.lines,
        { opacity: 0, filter: "blur(3px)" },
        { opacity: 1, filter: "blur(0px)", stagger: 0.1}
      );

      timeline.fromTo(
        imageSelector,
        { opacity: 0, y: 20,  scaleY: 1, filter: "blur(10px)",
          transformOrigin: "top",
        },
        {
          opacity: 1,
          scaleY: 1,
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageSelector,
            start: "top 100%",
            end: "bottom 80%",
            scrub: 2,
          },
        }
      );

      }

      animateParagraphMobile(".mobile-paragraph-1", ".mobile-image-1");
      animateParagraphMobile(".mobile-paragraph-2", ".mobile-image-2");
      animateParagraphMobile(".mobile-paragraph-3", ".mobile-image-3");
      animateParagraphMobile(".mobile-paragraph-4", ".mobile-image-4");
      animateParagraphMobile(".mobile-paragraph-5", ".mobile-image-5");


        
  setTimeout(() => {
    gsap.timeline()
    ScrollTrigger.create({
      trigger: 'body', 
      start: 'bottom bottom',
      end: 'bottom+=1 bottom',
      markers: true,
      scrub: 1,
      onEnter: () => {
        gsap.to(".footer-end", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"});
      },
      onEnterBack: () => {
        gsap.to(".footer-end", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"});
      }
    });
  }, 0)


    } else {


    const scrollContainer = document.querySelector(".steps-seciton");

    const lenis = new Lenis({
      orientation: 'horizontal',
      content: scrollContainer,
      gestureOrientation: "both"
    });

    lenis.on('scroll', (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.addEventListener('wheel', (e) => {
      scrollContainer.scrollLeft += e.deltaY;
    });

  }

})