import paginationAction from '../pagination/pagination';
import createCard from '../card/card';

function getSliderValues() {
  const slider = document.querySelector('.range-slider__slider');
  const values = slider.noUiSlider.get();
  return values;
}

function resetPagination(cards) {
  $(() => {
    $('.pagination').pajinatify('set', 1, cards);
  });
}

async function changeCards(n) {
  let data;
  const err = {
    room: 'error',
    class: '',
    price: '',
    stars: '0',
    reviews: '0',
    images: [''],
  };
  const catalogPage = document.querySelector('.rooms-catalog__rooms');
  catalogPage.innerHTML = '';
  try {
    data = await fetch('data.json');
    data = await data.json();
  } catch {
    data = err;
  }

  const filterValues = getSliderValues();
  const newDataIndex = [];
  for (let i = 0; i < data.length; i += 1) {
    if (+data[i].price <= filterValues[1] && +data[i].price >= filterValues[0]) {
      newDataIndex.push(i + 1);
    }
  }
  const firstCard = (n - 1) * 12;
  const endCard = n * 12;
  for (let i = firstCard; i < endCard; i += 1) {
    if (newDataIndex[i]) {
      createCard(catalogPage, data[newDataIndex[i] - 1].room);
    }
  }
  return newDataIndex.length;
}

function addSliderHandle() {
  const slider = document.querySelector('.range-slider__slider');
  slider.noUiSlider.on('end', () => {
    changeCards(1)
      .then((resolve) => resetPagination(resolve));
  });
}

function addCardsListener() {
  const roomslist = document.querySelector('.rooms-catalog__rooms');
  const stopClasses = ['swiper-button-next', 'swiper-button-prev'];
  roomslist.addEventListener('click', (e) => {
    if (!stopClasses.some((stopClass) => e.target.classList.contains(stopClass))) {
      if (e.target.closest('.room-card')) {
        const roomId = e.target.closest('.room-card').getAttribute('data-room-id');
        localStorage.setItem('room', roomId);
      }
    }
  });
}

changeCards(1);
addSliderHandle();
paginationAction(changeCards);
addCardsListener();
