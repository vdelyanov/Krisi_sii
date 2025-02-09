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
        { type: "image", src: "./assets/images/bts/bts-1.webp" },
        { 
          type: "video", 
          src: "https://player.vimeo.com/video/123456789", 
          thumbnail: "./assets/images/bts/bts-2.webp" 
        },
        { type: "image", src: "./assets/images/bts/bts-2.webp" },
      ],
      column2: [
        { 
          type: "video", 
          src: "https://player.vimeo.com/video/987654321", 
          thumbnail: "./assets/images/bts/bts-2.webp" 
        },
        { type: "image", src: "./assets/images/bts/bts-3.webp" },
      ],
    }
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

    function loadImages(category) {
      const columns = document.querySelectorAll(".columns .column");
      if (columns.length < 2) return;
    
      columns.forEach((column) => (column.innerHTML = "")); // Clear existing content
    
      const columnData = imageCategories[category];
      if (!columnData) return;
    
      let imagesToLoad = columnData.column1.length + columnData.column2.length;
      let imagesLoaded = 0;
    
      function checkAllImagesLoaded() {
        if (imagesLoaded === imagesToLoad) {
          reinitializeGSAP();
          refreshModal();
        }
      }
    
      function createMediaElement(item) {
        const wrapper = document.createElement("div");
        wrapper.className = "media-wrapper";
    
        if (item.type === "image") {
          const img = document.createElement("img");
          img.className = "img hover-link";
          img.src = item.src;
          img.loading = "lazy";
          img.alt = category;
          img.onload = () => {
            imagesLoaded++;
            checkAllImagesLoaded();
          };
          wrapper.appendChild(img);
        } else if (item.type === "video") {
          // Create thumbnail preview
          const thumbnail = document.createElement("img");
          thumbnail.className = "video-thumbnail hover-link";
          thumbnail.src = item.thumbnail;
          thumbnail.alt = "Video Thumbnail";
          thumbnail.loading = "lazy";
    
          // Play button overlay
          const playButton = document.createElement("div");
          playButton.className = "play-button";
          playButton.innerHTML = "▶"; // Play icon
    
          wrapper.appendChild(thumbnail);
          wrapper.appendChild(playButton);
    
          // Store video URL in dataset for lightbox
          wrapper.dataset.videoSrc = item.src;
          wrapper.classList.add("video-wrapper");
        }
    
        return wrapper;
      }
    
      columnData.column1.forEach((item) => columns[0].appendChild(createMediaElement(item)));
      columnData.column2.forEach((item) => columns[1].appendChild(createMediaElement(item)));
    }
    
    function loadCategoryFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const category = urlParams.get('category') || 'bts'; // Default category
      const activeButton = [...filterButtons].find(btn => btn.dataset.category === category);
      
      if (activeButton) {
        activeButton.classList.add('active');
      }
  
      loadImages(category);
    }
  
    function refreshModal() {
      const gridItems = document.querySelectorAll(".img, .video-wrapper");
      const lightbox = document.getElementById("lightbox");
      const lightboxContent = document.querySelector(".lightbox-content");
      const closeButton = document.querySelector(".lightbox-close");
      const prevButton = document.querySelector(".lightbox-prev");
      const nextButton = document.querySelector(".lightbox-next");
      const columns = document.querySelector(".columns");
      const filterTrigger = document.querySelector("#mobile-filter-categories");
      const colorSwitcher = document.querySelector(".color-switcher");
    
      let currentIndex = 0;
      let mediaItems = [];
    
      // Populate mediaItems array
      gridItems.forEach((item, index) => {
        if (item.classList.contains("video-wrapper")) {
          mediaItems.push({ type: "video", src: item.dataset.videoSrc });
        } else {
          mediaItems.push({ type: "image", src: item.src });
        }
    
        item.addEventListener("click", () => {
          currentIndex = index;
          openLightbox();
        });
      });
    
      function openLightbox() {
        lightboxContent.innerHTML = ""; // Clear previous content
        const currentItem = mediaItems[currentIndex];
    
        if (currentItem.type === "image") {
          const img = document.createElement("img");
          img.className = "lightbox-image";
          img.src = currentItem.src;
          lightboxContent.appendChild(img);
        } else if (currentItem.type === "video") {
          const iframe = document.createElement("iframe");
          iframe.className = "lightbox-video";
          iframe.src = currentItem.src + "?autoplay=1"; // Autoplay Vimeo videos
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("allowfullscreen", "true");
          lightboxContent.appendChild(iframe);
        }
    
        lightbox.classList.add("show");
        columns.classList.add("hide");
        filterTrigger.classList.add("hide");
        colorSwitcher.classList.add("hide");
    
        setTimeout(() => {
          lightbox.classList.add("opened");
        }, 10);
      }
    
      function closeLightbox() {
        lightbox.classList.remove("show");
        lightbox.classList.remove("opened");
    
        setTimeout(() => {
          columns.classList.remove("hide");
          filterTrigger.classList.remove("hide");
          colorSwitcher.classList.remove("hide");
        }, 500);
    
        lightboxContent.innerHTML = ""; // Clear content to stop video playback
      }
    
      function showPrevImage() {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        openLightbox();
      }
    
      function showNextImage() {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        openLightbox();
      }
    
      // Event Listeners
      closeButton.addEventListener("click", closeLightbox);
      prevButton.addEventListener("click", showPrevImage);
      nextButton.addEventListener("click", showNextImage);
    
      document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("show")) return;
        if (e.key === "ArrowLeft") showPrevImage();
        if (e.key === "ArrowRight") showNextImage();
        if (e.key === "Escape") closeLightbox();
      });
    
      document.addEventListener("click", function (event) {
        if (!lightbox.contains(event.target) && lightbox.classList.contains("opened")) {
          closeLightbox();
        }
      });
    }

    loadCategoryFromURL();
  
})