import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

function swiper() {
  const swiperSlider = new Swiper('.swiper', {
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  return swiperSlider;
}

function addSwiperContent() {
  const swiperContent = `
    <div class = "swiper">
      <div class = "swiper-wrapper"></div>
      <div class = "swiper-pagination"></div>
      <div class = "swiper-button-prev"></div>
      <div class = "swiper-button-next"></div>
    </div>
  `;
  return swiperContent;
}

export { swiper, addSwiperContent };
