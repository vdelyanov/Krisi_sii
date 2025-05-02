import { gsap } from "gsap";
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

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

document.addEventListener("DOMContentLoaded", function () { 
  
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
      session: {
        column1: [
          './assets/images/children/session1.webp',
          './assets/images/children/session2.webp',
          './assets/images/children/session3.webp',
          './assets/images/children/children3.webp',
          './assets/images/children/children4.webp',
          './assets/images/children/children5.webp',
          './assets/images/children/children6.webp',
          './assets/images/children/children1.webp',
          './assets/images/children/children7.webp',
        ],
        column2: [
          './assets/images/children/children8.webp',
          './assets/images/children/children2.webp',
          './assets/images/children/children11.webp',
          './assets/images/children/children12.webp',
          './assets/images/children/children9.webp',
          './assets/images/children/children10.webp',
          './assets/images/children/session4.webp',
          './assets/images/children/session5.webp',
          './assets/images/children/session6.webp',
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
          './assets/images/abstract/abstract5.webp',
          './assets/images/abstract/abstract15.webp',
          './assets/images/abstract/abstract18.webp',
          './assets/images/abstract/abstract19.webp',
          './assets/images/abstract/abstract22.webp',
          './assets/images/abstract/abstract24.webp',
          './assets/images/abstract/abstract23.webp',
        ],
        column2: [
          './assets/images/abstract/abstract20.webp',
          './assets/images/abstract/abstract21.webp',
          './assets/images/abstract/abstract7.webp',
          './assets/images/abstract/abstract13.webp',
          './assets/images/abstract/abstract2.webp',
          './assets/images/abstract/abstract4.webp',
          './assets/images/abstract/abstract9.webp',
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
      gsap.fromTo('footer', {
        opacity: 0,
        filter: "blur(20px)",
      }, {
        filter: "blur(20px)",
        opacity: 1,
        duration: 0.6,
        ease: "power4",
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
        img.loading = "lazy";
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
    const gridItems = document.querySelectorAll(".img");
    const columns = document.querySelector(".columns");
    const filterTrigger = document.querySelector("#mobile-filter-categories");
    const colorSwitcher = document.querySelector(".color-switcher");
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
          columns.classList.add("hide");
          filterTrigger.classList.add("hide");
          colorSwitcher.classList.add("hide");
          setTimeout(() => {
            lightbox.classList.add("opened");
          }, 10)
          updateLightboxImage();
      }
  
      function closeLightbox() {
          lightbox.classList.remove("show");
          lightbox.classList.remove("opened");
          setTimeout(() => {
            columns.classList.remove("hide");
            filterTrigger.classList.remove("hide");
            colorSwitcher.classList.remove("hide");
          }, 500)
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

      loadCategoryFromURL();
  
})