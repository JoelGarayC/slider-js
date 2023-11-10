const SLIDER_URL = './data.json';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(SLIDER_URL);
    const data = await response.json();
    const dataSlider = data?.slider || [];

    const isGestion = false;

    if (dataSlider?.length === 10) {
      const middleIndex = Math.floor(dataSlider.length / 2);
      const firstArray = dataSlider.slice(0, middleIndex);
      const secondArray = dataSlider.slice(middleIndex);

      const generateSlideHTML = (slideData) => `
        <a class="slide" href="${slideData.link}" target="_blank">
          <picture>
            <source 
              media="(min-width:768px)" 
              srcset="${slideData.image}" 
            >
            <img
              src="${slideData.imageMobile}"
              alt="${slideData.title}"
            />
          </picture>
          <div class="slide-data ${isGestion ? 'gestion' : ''}">
            <h2>${slideData.title}</h2>
            <p>${slideData.description}</p>
          </div>
        </a>
      `;

      const generateSliderHTML = (sliderData, sliderClass) => `
        <div class="slider ${sliderClass}" id="${
        sliderClass ? 'secondSlider' : 'firstSlider'
      }">
          ${sliderData.map(generateSlideHTML).join('')}
        </div>
      `;

      const duplicateSlider = (sliderClass) => {
        const slider = document.querySelector(`.${sliderClass}`);
        slider.innerHTML += slider.innerHTML;
      };

      const contentContainer = document.querySelector('.slider-wrapper');

      contentContainer.innerHTML =
        generateSliderHTML(firstArray, '') +
        generateSliderHTML(secondArray, 'secondSlider');

      duplicateSlider('slider');
      duplicateSlider('secondSlider');
      duplicateSlider('slider');
      duplicateSlider('secondSlider');

      // Animation

      const firstSlider = document.querySelector('#firstSlider');
      const secondSlider = document.querySelector('#secondSlider');

      animateSlider(firstSlider, 1);
      animateSlider(secondSlider, 2);
    }

    function animateSlider(slider, speed) {
      let translateValue = 0;
      const animateSlide = () => {
        // const slideWidth = slider.firstElementChild.offsetWidth + 24;
        const slideWidth = slider.firstElementChild.offsetWidth;
        const totalWidth = slideWidth * dataSlider.length;

        translateValue -= speed;
        slider.style.transform = `translateX(${translateValue}px)`;

        if (Math.abs(translateValue) >= totalWidth) {
          translateValue = 0;
        }

        if (!isMouseOver) {
          requestAnimationFrame(() => animateSlide(slider, speed));
        }
      };

      let isMouseOver = false;

      slider.addEventListener('mouseover', () => {
        isMouseOver = true;
      });

      slider.addEventListener('mouseout', () => {
        isMouseOver = false;
        requestAnimationFrame(() => animateSlide(slider, speed));
      });

      animateSlide(slider, speed);
    }
  } catch (error) {
    console.error(error);
  }
});
