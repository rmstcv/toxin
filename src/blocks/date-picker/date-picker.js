import AirDatepicker from 'air-datepicker';

function checkRangeClass() {
  const inRangeElems = document.querySelectorAll('.air-datepicker-cell.-day-.-selected-.-range-from-');
  inRangeElems.forEach((elem) => {
    if (elem.nextSibling.classList.contains('-in-range-') || elem.nextSibling.classList.contains('-range-to-')) {
      elem.classList.remove('datepicker-inrange-background-none');
    } else {
      elem.classList.add('datepicker-inrange-background-none');
    }
  });
}

function addRangeClassHandler(airDatepickerItem) {
  const inRangeElems = document.querySelectorAll('.air-datepicker-body--cells.-days-');
  let item;
  inRangeElems.forEach((elem) => {
    if (elem.closest('.js-date-picker') === airDatepickerItem) item = elem;
  });
  item.parentNode.addEventListener('mousemove', () => {
    checkRangeClass();
  });
}

function createAirDatePicker(...args) {
  const [airDatepickerItem, setDates, showDates] = args;
  let [dateCheckIn, dateCheckOut] = [];
  const button = {
    content: 'Применить',
    className: 'custom-button-classname',
    onClick: () => {
      airDatepickerItem.classList.add('date-picker_hide');
    },
  };
  let selectedDates;
  let initDateIn;
  let initDateOut;
  try {
    initDateIn = localStorage.getItem('dateIn');
    initDateOut = localStorage.getItem('dateOut');
    selectedDates = [initDateIn, initDateOut];
  } catch {
    selectedDates = false;
  }
  if (!initDateIn || !initDateOut) {
    selectedDates = false;
  }
  const dp = new AirDatepicker(airDatepickerItem, {
    range: true,
    inline: true,
    navTitles: {
      days: 'MMMM yyyy',
    },
    buttons: ['clear', button],
    onSelect() {
      [dateCheckIn, dateCheckOut] = dp.selectedDates;
      if (setDates) setDates(dateCheckIn, dateCheckOut);
      if (showDates) showDates(dateCheckIn, dateCheckOut);
      checkRangeClass();
    },
    selectedDates,
  });
  addRangeClassHandler(airDatepickerItem);
  checkRangeClass();
  return dp;
}

export default createAirDatePicker;
