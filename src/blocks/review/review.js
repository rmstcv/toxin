import addLikeButton from '../button-like/button-like';

function correctDate(days) {
  let content;
  let date;
  if (+days === 1) {
    content = '1 день назад';
  }
  if (+days > 1 && +days < 5) {
    content = `${days} дня назад`;
  }
  if (+days >= 5 && +days < 7) {
    content = `${days} дней назад`;
  }
  if (+days >= 7 && +days < 14) {
    content = 'неделю назад';
  }
  if (+days >= 14 && +days < 30) {
    date = Math.round(days / 7);
    content = `${date} недели назад`;
  }
  if (+days >= 30 && +days < 60) {
    content = 'месяц назад';
  }
  if (+days >= 60 && +days < 120) {
    date = Math.round(days / 30);
    content = `${date} месяца назад`;
  }
  if (+days >= 120 && +days < 365) {
    date = Math.round(days / 30);
    content = `${date} месяцев назад`;
  }
  if (+days >= 365 && +days < 730) {
    date = Math.round(days / 365);
    content = 'год назад';
  }
  if (+days >= 720 && +days < 1460) {
    date = Math.round(days / 365);
    content = `${date} года назад`;
  }
  if (+days >= 1460) {
    date = Math.round(days / 365);
    content = `${date} лет назад`;
  }
  return content;
}

function addReviews(data) {
  const reviews = document.querySelectorAll('.js-review');
  const names = document.querySelectorAll('.js-review__name');
  const imgs = document.querySelectorAll('.js-review__image');
  const texts = document.querySelectorAll('.js-review__text');
  const likes = document.querySelectorAll('.js-review__likes');
  const dates = document.querySelectorAll('.js-review__date');
  const today = new Date();
  for (let i = 0; i < reviews.length; i += 1) {
    names[i].innerHTML = data[i].name;
    imgs[i].setAttribute('src', `${data[i].avatar}`);
    texts[i].innerHTML = data[i].text;
    const newDate = new Date(data[i].date);
    const days = Math.round((today - newDate) / (1000 * 60 * 60 * 24));
    dates[i].innerHTML = correctDate(days);
    addLikeButton(data[i].likes, likes[i]);
  }
}

export default addReviews;
