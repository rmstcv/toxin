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

changeCards(1);
addSliderHandle();
paginationAction(changeCards);
