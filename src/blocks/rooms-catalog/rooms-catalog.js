import paginationAction from '../pagination/pagination';
import createCard from '../card/card';

function getSliderValues() {
  const slider = document.querySelector('.js-range-slider__slider');
  const values = slider.noUiSlider.get();
  return values;
}

function resetPagination(cards) {
  let cardsNum = cards;
  if (cards === 0) {
    cardsNum = 1;
  }
  $(() => {
    $('.pagination').pajinatify('set', 1, cardsNum);
  });
}

function addPagesCounter(firstCard, endCard, total) {
  const roomsOnPage = document.querySelector('.js-rooms-catalog__rooms-on-page');
  const roomsTotal = document.querySelector('.js-rooms-catalog__pages-total');
  if (total < 100) {
    roomsTotal.innerHTML = ` ${total} `;
  } else {
    roomsTotal.innerHTML = ' 100+ ';
  }
  if (endCard === 0) {
    roomsOnPage.innerHTML = '0 &mdash; 0 ';
  } else {
    roomsOnPage.innerHTML = `${firstCard} &mdash; ${endCard} `;
  }
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
  const catalogPage = document.querySelector('.js-rooms-catalog__rooms');
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
  let endCard = n * 12;
  for (let i = firstCard; i < endCard; i += 1) {
    if (newDataIndex[i]) {
      createCard(catalogPage, data[newDataIndex[i] - 1].room);
    } else {
      endCard = i;
    }
  }
  addPagesCounter(firstCard + 1, endCard, newDataIndex.length);
  return newDataIndex.length;
}

function addSliderHandle() {
  const slider = document.querySelector('.js-range-slider__slider');
  slider.noUiSlider.on('end', () => {
    changeCards(1)
      .then((resolve) => resetPagination(resolve));
  });
}

function addCardsListener() {
  const roomslist = document.querySelector('.js-rooms-catalog__rooms');
  const stopClasses = ['swiper-button-next', 'swiper-button-prev'];
  roomslist.addEventListener('click', (e) => {
    if (!stopClasses.some((stopClass) => e.target.classList.contains(stopClass))) {
      if (e.target.closest('.js-room-card')) {
        const roomId = e.target.closest('.js-room-card').getAttribute('data-room-id');
        try {
          localStorage.setItem('room', roomId);
        } catch {
          localStorage.setItem('room', '888');
        }
        window.location.href = 'room-details.html';
      }
    }
  });
}

changeCards(1);
addSliderHandle();
paginationAction(changeCards);
addCardsListener();
