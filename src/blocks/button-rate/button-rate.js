function addStars(elem, stars) {
  const starsElem = document.createElement('div');
  starsElem.classList.add('rate-buttons');
  elem.append(starsElem);
  for (let i = 0; i < stars; i += 1) {
    const star = document.createElement('div');
    star.classList.add('rate-buttons__item', 'rate-buttons__item_colored');
    starsElem.append(star);
  }
  for (let i = 0; i < (5 - stars); i += 1) {
    const star = document.createElement('div');
    star.classList.add('rate-buttons__item', 'rate-buttons__item_uncolored');
    starsElem.append(star);
  }
}

export default addStars;
