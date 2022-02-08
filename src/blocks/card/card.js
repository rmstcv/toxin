import insertRoomInfo from '../room-short-info/room-short-info';
import addStars from '../button-rate/button-rate';
import { swiper, addSwiperContent } from '../swiper/swiper';
import getData from '../../libs/get-json-data';

class Card {
  constructor(cardElem, room) {
    this.cardElem = cardElem;
    this.room = room;
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
    for (let i = 0; i < data.length; i += 1) {
      const img = document.createElement('div');
      img.classList.add('swiper-slide');
      img.innerHTML = `<img src=${data[i]} alt="image" loading="lazy" width="270" height="151">`;
      this.findElem('.swiper-wrapper').prepend(img);
    }
  }

  addStarsRate(data) {
    const star = this.findElem('.room-card__rate-wrapper');
    addStars(star, data.stars);
  }

  addRoomRate(data) {
    const rate = this.findElem('.room-card__rate-info');
    rate.innerHTML = `${data.reviews} <span>Отзывов</span>`;
  }

  cardInit(roomData) {
    this.addCardImage(roomData.images);
    this.addRoomRate(roomData);
    this.addStarsRate(roomData);
  }
}
Card.prototype.addStars = addStars;

function createCard(parent, room) {
  const slider = addSwiperContent();
  const cardContent = `
      <div class = "room-card__image">
        ${slider}
      </div>
      <div class = "room-card__info-wrapper">
        <div class = "room-card__info"></div>
        <div class = "room-card__divider"></div>
        <div class = "room-card__rate-wrapper">
          <div class = "room-card__rate-info"></div>
        </div>
      </div>
  `;
  const roomCard = document.createElement('div');
  roomCard.classList.add('room-card');
  roomCard.setAttribute('data-room-id', room);
  roomCard.innerHTML = cardContent;
  parent.append(roomCard);
  swiper();
  const card = new Card(roomCard, room);
  (async () => {
    const data = await getData('data.json', room);
    card.cardInit(data);
    insertRoomInfo(data, roomCard.children[1].children[0]);
  })();
}

export default createCard;
