document.addEventListener("DOMContentLoaded", function () {
  
      const hero = document.querySelector('#error-page')
    
      const settings = {
          isEnabled: false,
          count: 1,
          time: 50,
      };
    
      const images = [
          './assets/images/abstract/abstract1.webp',
          './assets/images/abstract/abstract2.webp',
          './assets/images/abstract/abstract3.webp',
          './assets/images/abstract/abstract4.webp',
          './assets/images/abstract/abstract5.webp',
          './assets/images/abstract/abstract6.webp',
          './assets/images/abstract/abstract7.webp',
          './assets/images/abstract/abstract8.webp',
      ];
    
      const preloadImages = () => {
          for (let i = 0; i < images.length; i++) {
              let link = document.createElement('link-img');
              link.as = 'image';
              link.href = images[i];
              document.head.appendChild(link);
          }
      };
    
      const calcIndex = (length) => {
          settings.count++;
    
          if (settings.count == length) settings.count = 0;
    
          return settings.count;
      };
    
      const animateImages = (event) => {
          const image = document.createElement('img');
          const imageSize = 15;
    
          const countIndex = calcIndex(images.length);
    
          image.classList.add('hero_media');
          image.setAttribute('src', images[countIndex]);
    
          image.style.width = `${imageSize}rem`;
          image.style.height = `${imageSize}rem`;
    
          const heroRect = hero.getBoundingClientRect();
    
          image.style.top = event.clientY - heroRect.top - (imageSize * 10) / 2 + 'px';
          image.style.left = event.clientX - heroRect.left - (imageSize * 10) / 2 + 'px';
    
          hero.appendChild(image);
    
          const randomDeg = Math.floor(Math.random() * 15);
    
          window.setTimeout(() => {
              image.style.opacity = 0.1;
              image.style.transform = 'scale(1)';
              image.style.transform = `rotate(${randomDeg}deg)`;
          }, 50);
    
          window.setTimeout(() => {
              image.style.opacity = 0;
              image.style.filter = 'blur(10px)';
              image.style.transform = 'scale(0.25)';
          }, 1000);
    
          window.setTimeout(() => {
              hero.removeChild(image);
          }, 1500);
      };
    
      hero.addEventListener('mousemove', (event) => {
            if (!settings.isEnabled) {
              settings.isEnabled = true;
    
              setTimeout(() => {
                  settings.isEnabled = false;
              }, settings.time);
    
              animateImages(event);
          }
      });
    
      window.onload = () => {
          preloadImages();
      };
    
    })
    