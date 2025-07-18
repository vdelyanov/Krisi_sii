import { gsap } from "gsap";
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", function () { 

    let tween = gsap
    .to(".marquee-part", {
        xPercent: -100,
        repeat: -1,
        duration: 10,
        ease: "linear",
    })
    .totalProgress(0.5);

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        setTimeout(() => {
          let menu = document.querySelector("main"); 
  
          if (menu.classList.contains("bg-blur")) {
              tween.pause();
          } else {
              tween.resume();
          }
      }, 1000);
      }
    })

    document.addEventListener("click", () => {
      setTimeout(() => {
          let menu = document.querySelector("main"); 
  
          if (menu.classList.contains("bg-blur")) {
              tween.pause();
          } else {
              tween.resume();
          }
      }, 1000);

  });

    gsap.set(".marquee-inner", { xPercent: -50 });

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
          scrub: 1.6,
          },

      });

      // Animate text characters
      timeline.fromTo(
        splitDescM.lines,
        { opacity: 0, filter: "blur(1px)", y: 10 },
        { opacity: 1, filter: "blur(0px)", y: 0, stagger: 0.1}
      );

      const isMobile = window.innerWidth <= 1025; 
      if (!isMobile) { 
          timeline.fromTo(
            paragraphSelectorM,
            {  y: 0 },
            { y: '-100%',
                scrollTrigger: {
                trigger: imageSelector,
                start: "top 70%",
                end: "bottom 50%",
                scrub: 1.6,
              },
            }
          );
      }
      
      timeline.fromTo(
        imageSelector,
        { opacity: 0,
          filter: "blur(4px)",
          transformOrigin: "top",
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0);",
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          autoAlpha: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageSelector,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1.6,
          },
        }
      );

      }

      animateParagraphMobile(".mobile-paragraph-1", ".mobile-image-1");
      animateParagraphMobile(".mobile-paragraph-2", ".mobile-image-2");
      animateParagraphMobile(".mobile-paragraph-3", ".mobile-image-3");
      animateParagraphMobile(".mobile-paragraph-4", ".mobile-image-4");
      animateParagraphMobile(".mobile-paragraph-5", ".mobile-image-5");

    })
