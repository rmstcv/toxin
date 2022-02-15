import paginationAction from '../pagination/pagination';
import createCard from '../card/card';

function getSliderValues() {
  const slider = document.querySelector('.js-range-slider__slider');
  const values = slider.noUiSlider.get();
  return values;
}

function filter(data) {
  const filterValues = getSliderValues();
  let isFilter = false;
  const rules = [];
  const rulesCheckbox = document.querySelectorAll('[data-rule-id]');
  for (let i = 0; i < rulesCheckbox.length; i += 1) {
    let rule;
    if (+rulesCheckbox[i].checked) {
      rule = +rulesCheckbox[i].getAttribute('data-rule-id');
    }
    if (rule) {
      rules.push(rule);
    }
  }
  let interId = false;
  if (data.rules) {
    interId = data.rules.some((id) => rules.includes(id));
  }
  if (+data.price <= filterValues[1]
    && +data.price >= filterValues[0]
    && !interId) {
    isFilter = true;
  }
  return isFilter;
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
    rules: [''],
  };
  const catalogPage = document.querySelector('.js-rooms-catalog__rooms');
  catalogPage.innerHTML = '';
  try {
    data = await fetch('data.json');
    data = await data.json();
  } catch {
    data = err;
  }

  const newDataIndex = [];
  for (let i = 0; i < data.length; i += 1) {
    if (filter(data[i])) {
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

function addCheckboxHandle() {
  const checkboxes = document.querySelector('.js-search-room__filter');
  checkboxes.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkbox-button__custom')) {
      changeCards(1);
    }
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
addCheckboxHandle();
paginationAction(changeCards);
addCardsListener();
