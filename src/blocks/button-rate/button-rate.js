function addStars(elem) {
  const starElem = elem;
  const stars = +starElem.getAttribute('data-rate');
  for (let i = 0; i < elem.children.length; i += 1) {
    elem.children[i].remove();
  }
  for (let i = 0; i < stars; i += 1) {
    const star = document.createElement('div');
    star.classList.add('rate-buttons__item', 'rate-buttons__item_colored');
    elem.append(star);
  }
  for (let i = 0; i < (5 - stars); i += 1) {
    const star = document.createElement('div');
    star.classList.add('rate-buttons__item', 'rate-buttons__item_uncolored');
    elem.append(star);
  }
}

export default addStars;
