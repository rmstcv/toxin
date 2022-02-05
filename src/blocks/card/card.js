import insertRoomInfo from '../room-short-info/room-short-info';
import addStars from '../button-rate/button-rate';
import swiper from '../swiper/swiper';
import getData from '../../libs/get-json-data';

swiper();

class Card {
  constructor(cardElem) {
    this.cardElem = cardElem;
    this.room = cardElem.getAttribute('data-room');
  }

  findElem(elemClass) {
    const elems = document.querySelectorAll(elemClass);
    let elem;
    for (let i = 0; i < elems.length; i += 1) {
      if (elems[i].closest('.room-card') === this.cardElem) {
        elem = elems[i];
      }
    }
    return elem;
  }

  addCardImage(data) {
    data.images.forEach((item) => {
      const img = document.createElement('div');
      img.classList.add('swiper-slide');
      img.innerHTML = `<img src=${item} alt="image" loading="lazy" width="270" height="151">`;
      console.log(document.querySelector('.swiper-wrapper'));
      this.findElem('.swiper-wrapper').prepend(img);
    });
  }

  addStarsRate(data) {
    const star = this.findElem('.rate-buttons');
    star.setAttribute('data-rate', data.stars);
    addStars(star);
  }

  addRoomRate(data) {
    const rate = this.findElem('.room-card__rate-info');
    rate.innerHTML = `${data.reviews} <span>Отзывов</span>`;
  }

  cardInit(roomData) {
    this.addCardImage(roomData);
    this.addRoomRate(roomData);
    this.addStarsRate(roomData);
  }
}
Card.prototype.addStars = addStars;
const cards = document.querySelectorAll('.room-card');
cards.forEach((elem) => {
  const room = elem.getAttribute('data-room');
  const card = new Card(elem);
  (async () => {
    const data = await getData('data.json', room);
    card.cardInit(data);
    insertRoomInfo(room, elem.childNodes[1].childNodes[0]);
  })();
});
