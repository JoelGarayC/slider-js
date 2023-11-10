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
          <img
            src="${slideData.image}"
            alt="${slideData.title}"
            decoding="async"
          />
          <div class="slide-data ${isGestion ? 'gestion' : ''}">
            <h2>${slideData.title}</h2>
            <p>${slideData.description}</p>
          </div>
        </a>
      `;

      const generateSliderHTML = (sliderData, sliderClass) => `
        <section class="slider-content">
          <div class="slider ${sliderClass}">
            ${sliderData.map(generateSlideHTML).join('')}
          </div>
        </section>
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
    }
  } catch (error) {
    console.error(error);
  }
});

