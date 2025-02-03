import { gsap } from "gsap";
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

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

      setTimeout(() => {
        gsap.to("canvas", {
          scrollTrigger: {
            trigger: document.documentElement,
            start: "bottom 100%",
            end: "bottom 90%",
            scrub: 1,
          },
          ease: "power4.out",
          opacity: 0,
        });
      }, 2200);

      let topOffset = 35;
      function animateParagraph(paragraphSelector, imageSelector) {
        
      const textDesc = document.querySelector(paragraphSelector);
      if (!textDesc) return;

      const splitDesc = new SplitText(textDesc, { type: "words,chars" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: paragraphSelector,
          start: "top 34%",
          end: "bottom 34%",
          pin: true,
          pinSpacing: false,
          scrub: 3,
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
        { opacity: 0.2, filter: "blur(2px)" },
        { opacity: 1, filter: "blur(0px)", stagger: 0.3}
      );

      // Animate associated image
      timeline.fromTo(
        imageSelector,
        { top: "1000%", scaleY: 2, filter: "blur(100px)"},
        {
          top: `${topOffset}vh`,
          scaleY: 1,
          filter: "blur(0px)",
          ease: "power4.out",
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

})