import createAirDatePicker from '../date-picker/date-picker';

class DatePicker {
  constructor(airDatepickerItem) {
    this.airDatepickerItem = airDatepickerItem;
    this.showDates = this.showDates.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
  }

  searchElemForPicker(elem) {
    const items = document.querySelectorAll(elem);
    let searchedElem;
    items.forEach((item) => {
      if (this.airDatepickerItem.closest('.js-dropdown-date') === item.closest('.js-dropdown-date')) {
        searchedElem = item;
      }
    });
    return searchedElem;
  }

  searchElemsForPicker(elems) {
    const items = document.querySelectorAll(elems);
    const searchedElems = [];
    items.forEach((item) => {
      if (this.airDatepickerItem.closest('.js-dropdown-date') === item.closest('.js-dropdown-date')) {
        searchedElems.push(item);
      }
    });
    return searchedElems;
  }

  static setDates(dateCheckIn, dateCheckOut) {
    if (dateCheckIn) {
      localStorage.setItem('dateIn', dateCheckIn);
    } else {
      localStorage.removeItem('dateIn');
    }
    if (dateCheckOut) {
      localStorage.setItem('dateOut', dateCheckOut);
    } else {
      localStorage.removeItem('dateOut');
    }
  }

  getDates() {
    let dateCheckIn;
    let dateCheckOut;
    try {
      dateCheckIn = localStorage.getItem('dateIn');
    } catch {
      dateCheckIn = null;
    }
    try {
      dateCheckOut = localStorage.getItem('dateOut');
    } catch {
      dateCheckOut = null;
    }
    this.showDates(dateCheckIn, dateCheckOut);
  }

  showDates(dateIn, dateOut) {
    let dateCheckIn = new Date(dateIn);
    let dateCheckOut = new Date(dateOut);
    const checkInInput = this.searchElemForPicker('.js-dropdown-date__input-check-in');
    const checkOutInput = this.searchElemForPicker('.js-dropdown-date__input-check-out');
    const checkInput = this.searchElemForPicker('.js-dropdown-date__input-check');
    const optionsDateDouble = {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    };
    const optionsDateSingle = {
      month: 'short',
      day: 'numeric',
    };
    if (checkInput) {
      if (!dateIn) dateCheckIn = '???? ??????';
      if (!dateOut) dateCheckOut = '???? ??????';
      dateCheckIn = dateCheckIn.toLocaleString('ru', optionsDateSingle).replace(/\./g, '');
      dateCheckOut = dateCheckOut.toLocaleString('ru', optionsDateSingle).replace(/\./g, '');
      checkInput.value = `${dateCheckIn} - ${dateCheckOut}`;
    }
    if (checkInInput && checkOutInput) {
      if (!dateIn) dateCheckIn = '????.????.????????';
      if (!dateOut) dateCheckOut = '????.????.????????';
      dateCheckIn = dateCheckIn.toLocaleString('ru', optionsDateDouble);
      dateCheckOut = dateCheckOut.toLocaleString('ru', optionsDateDouble);
      checkInInput.value = dateCheckIn;
      checkOutInput.value = dateCheckOut;
    }
  }

  showDatePicker() {
    const items = this.searchElemsForPicker('.js-dropdown-date__check-wrapper');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        this.airDatepickerItem.classList.toggle('date-picker_hide');
      });
    });
  }

  initDatePicker() {
    this.showDatePicker();
    this.getDates();
  }
}

function addDropdownDate(picker) {
  const airDatepickers = document.querySelectorAll(picker);
  let dropDate;
  airDatepickers.forEach((airDatepickerItem) => {
    dropDate = new DatePicker(airDatepickerItem);
    const args = [
      airDatepickerItem,
      DatePicker.setDates,
      dropDate.showDates,
    ];
    createAirDatePicker(...args);
    dropDate.initDatePicker();
  });
  return dropDate;
}

addDropdownDate('.js-date-picker');
