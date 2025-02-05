import { gsap } from "gsap";
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

import Lenis from 'lenis'

document.addEventListener("DOMContentLoaded", function () { 


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

          // Marquee 
  
          let tween = gsap
          .to(".marquee__part", {
              yPercent: 100,
              repeat: -1,
              duration: 35,
              ease: "none",
          })
          gsap.set(".marquee__inner", { y: "-100vh" });
      
    
          let tweenEnd = gsap
          .to(".marquee__part.end", {
              yPercent: -100,
              repeat: -1,
              duration: 35,
              ease: "linear",
    
          })
          gsap.set(".marquee__inner.end", { y: "-100vh"  });
      
        function resetScrollTriggers() {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          ScrollTrigger.refresh();
        }
        resetScrollTriggers();


    setTimeout(() => {
      gsap.to("canvas", {
        scrollTrigger: {
          trigger: ".marquee",
          start: "left 80%",
          end: "left 40%",
          scrub: 1,
          horizontal: true,
        },
        ease: "linear",
        opacity: 0,
        pointerEvents: "none"
      });
    }, 2200);


    gsap.to("#scroll-icon", {
      scrollTrigger: {
        trigger: ".steps-seciton",
        start: "left 0%",
        end: "left -10%",
        scrub: 1,
        horizontal: true,
      },
      ease: "linear",
      opacity: 0,
      filter: "blur(20px)",
      pointerEvents: "none"
    });

    gsap.fromTo("#marquee-start", {
      opacity: 0.4, 
      filter: "blur(4px)"
    }, {
      scrollTrigger: {
        trigger: "#marquee-start",
        start: "left 80%",
        end: "left 40%",
        scrub: 1,
        horizontal: true,
      },
      ease: "linear",
      opacity: 1,
      filter: "blur(0px)"
    });

    gsap.to("#marquee-end", {
      scrollTrigger: {
        trigger: "#marquee-end",
        start: "right 100%",
        end: "left 80%",
        scrub: 1,
        horizontal: true,
      },
      ease: "linear",
      opacity: 0.4,
      filter: "blur(4px)"
    });

    gsap.to(".image-1", {
      scrollTrigger: {
        trigger: ".image-1",
        start: "left 60%",
        toggleActions: "play none none reverse",
        horizontal: true,
      },
      ease: "power4.out",
      opacity: 1,
      duration: 1,
      filter: "blur(0px)",
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
    });
    gsap.to(".image-2", {
      scrollTrigger: {
        trigger: ".image-2",
        start: "left 60%",
        toggleActions: "play none none reverse",
        horizontal: true,
      },
      ease: "power4.out",
      opacity: 1,
      duration: 1,
      filter: "blur(0px)",
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
    });
    gsap.to(".image-3", {
      scrollTrigger: {
        trigger: ".image-3",
        start: "left 60%",
        toggleActions: "play none none reverse",
        horizontal: true,
      },
      ease: "power4.out",
      opacity: 1,
      duration: 1,
      filter: "blur(0px)",
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
    });
    gsap.to(".image-4", {
      scrollTrigger: {
        trigger: ".image-4",
        start: "left 60%",
        toggleActions: "play none none reverse",
        horizontal: true,
      },
      ease: "power4.out",
      opacity: 1,
      duration: 1,
      filter: "blur(0px)",
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
    });

    gsap.to(".image-5", {
      scrollTrigger: {
        trigger: ".image-5",
        start: "left 60%",
        toggleActions: "play none none reverse",
        horizontal: true,
      },
      ease: "power4.out",
      opacity: 1,
      duration: 1,
      filter: "blur(0px)",
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
    });

    function animateParagraph(paragraphSelector) {

    const textDesc = document.querySelector(paragraphSelector);
    const splitDesc = new SplitText(textDesc, { type: "words,chars,lines" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: paragraphSelector,
        start: "left: 75%",
        toggleActions: "play none none reverse",
        horizontal: true,
        },

    });

    // Animate text characters
    timeline.fromTo(
      splitDesc.chars,
      { opacity: 0, filter: "blur(2px)" },
      { opacity: 1, filter: "blur(0px)", stagger: 0.005, duration: 1}
    );

    }

    animateParagraph(".paragraph-1");
    animateParagraph(".paragraph-2");
    animateParagraph(".paragraph-3");
    animateParagraph(".paragraph-4");
    animateParagraph(".paragraph-5");

    const scrollContainer = document.querySelector(".steps-seciton");

    const lenis = new Lenis({
      orientation: 'horizontal',
      content: scrollContainer,
      gestureOrientation: "both"
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