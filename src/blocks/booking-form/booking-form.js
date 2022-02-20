import '../dropdown-date/dropdown-date';
import '../dropdown/dropdown';
import insertRoomInfo from '../room-short-info/room-short-info';
import addSpace from '../../libs/add-spaces';
import getData from '../../libs/get-json-data';

class BookingForm {
  constructor(roomData, room) {
    this.form = document.querySelector('.booking-form');
    this.room = room;
    this.roomData = roomData;
  }

  insertCalcInfo() {
    const calcInfoElem = document.createElement('div');
    const price = Number(this.roomData.price);
    let dayIn;
    let dayOut;
    try {
      dayIn = new Date(localStorage.getItem('dateIn'));
      dayOut = new Date(localStorage.getItem('dateOut'));
    } catch {
      dayIn = 0;
      dayOut = 0;
    }
    const days = (dayOut.getTime() - dayIn.getTime()) / 86400000;
    let daysPostfix = 'суток';
    let addServices = 0;
    let sale = 2179;
    let services = 300;
    if (!this.roomData.price || days === 0) {
      addServices = 0;
      sale = 0;
      services = 0;
    }
    const total = addSpace(addServices + services - sale + (price * days));
    if (days === 1) daysPostfix = 'сутки';
    const content = `
      <div class = "booking-form__value-calc booking-form__value-calc_days-calc">
        <div>${addSpace(price)}&#8381; x ${days} ${daysPostfix}</div>
        <div class = "booking-form__value-sum">${addSpace(price * days)}&#8381;</div>
      </div>
      <div class = "booking-form__value-calc">
        <div>Сбор за услуги: скидка ${addSpace(sale)}&#8381;</div>
        <div class = "booking-form__info"></div>
        <div class = "booking-form__value-sum">${addServices}&#8381;</div>
        <div>Сбор за дополнительные услуги</div>
        <div class = "booking-form__info"></div>
        <div class = "booking-form__value-sum">${services}&#8381;</div>
      </div>
    <div class = "booking-form__calc-total">
      <div>Итого</div>
      <div class = "booking-form__calc-line"></div>
      <div>${total}&#8381;</div>
    </div>
    `;
    calcInfoElem.classList.add('booking-form__calc-content');
    calcInfoElem.innerHTML = content;
    document.querySelector('.booking-form__calc').appendChild(calcInfoElem);
  }

  init() {
    insertRoomInfo(this.roomData, this.form.firstElementChild);
    this.insertCalcInfo();
  }
}
(async () => {
  let room;
  try {
    const roomData = localStorage.getItem('room');
    room = roomData;
  } catch (e) {
    room = '888';
  }
  const data = await getData('data.json', room);
  const bookingForm = new BookingForm(data, room);
  bookingForm.init();
})();
