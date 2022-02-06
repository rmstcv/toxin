import paginationAction from '../pagination/pagination';
import createCard from '../card/card';

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
  const firstCard = (n - 1) * 12;
  const endCard = n * 12;
  for (let i = firstCard; i < endCard; i += 1) {
    if (i < data.length) {
      createCard(catalogPage, data[i].room);
    } else {
      createCard(catalogPage, data[i - data.length * n + 12].room);
    }
  }
}

changeCards(1);
paginationAction(changeCards);
