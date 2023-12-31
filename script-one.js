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
        <div class="slider ${sliderClass}">
          ${sliderData.map(generateSlideHTML).join('')}
        </div>
      `;

      const contentContainer = document.querySelector('.slider-wrapper');

      if (contentContainer) {
        contentContainer.innerHTML =
          generateSliderHTML([...firstArray, ...firstArray], '') +
          generateSliderHTML([...secondArray, ...secondArray], 'secondSlider');
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// if (!isMouseOver) {
//   requestAnimationFrame(() => animateSlide());
// }

// let isMouseOver = false;

// slider.addEventListener('mouseover', () => {
// isMouseOver = true;
// });

// slider.addEventListener('mouseleave', () => {
// isMouseOver = false;
// requestAnimationFrame(() => animateSlide());
// });
