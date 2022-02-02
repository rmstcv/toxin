import noUiSlider from 'nouislider';
import addSpaces from '../../libs/add-spaces';

class RangeSlider {
  constructor(slider) {
    this.slider = slider;
    this.startMin = 5000;
    this.startMax = 10000;
    this.min = 0;
    this.max = 15000;
    this.valuesAreaMin = document.querySelector('.range-slider__value-min');
    this.valuesAreaMax = document.querySelector('.range-slider__value-max');
  }

  init() {
    this.createSlider();
    this.addValues();
  }

  createSlider() {
    noUiSlider.create(this.slider, {
      start: [this.startMin, this.startMax],
      connect: true,
      range: {
        min: this.min,
        max: this.max,
      },
    });
  }

  addValues() {
    let valueMin = this.addSpaces(this.startMin);
    let valueMax = this.addSpaces(this.startMax);
    this.valuesAreaMin.innerHTML = `${valueMin}&#8381`;
    this.valuesAreaMax.innerHTML = `${valueMax}&#8381`;
    this.slider.noUiSlider.on('slide', (values) => {
      [valueMin, valueMax] = values;
      valueMin = this.addSpaces(Math.round(valueMin));
      valueMax = this.addSpaces(Math.round(valueMax));
      this.valuesAreaMin.innerHTML = `${valueMin}&#8381`;
      this.valuesAreaMax.innerHTML = `${valueMax}&#8381`;
    });
  }
}

function addRangeSlider() {
  const rangeSlider = document.querySelector('.range-slider__slider');
  RangeSlider.prototype.addSpaces = addSpaces;
  const slider = new RangeSlider(rangeSlider);
  slider.init();
}

addRangeSlider();
