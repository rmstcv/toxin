import '../../main';
import '../../main.css';
import addImages from '../../blocks/room-details-images/room-details-images';
import addDetails from '../../blocks/details/details';
import '../../blocks/booking-form/booking-form';
import chart from '../../blocks/chart/chart';
import getJsonData from '../../libs/get-json-data';
import getReviewsData from '../../libs/get-json-rewiews';
import addReviews from '../../blocks/review/review';

async function addInfo() {
  let room;
  try {
    room = localStorage.getItem('room');
  } catch {
    room = '888';
  }
  const data = await getJsonData('data.json', room);
  addImages(data.images);
  addDetails(data.details);
  chart(data.votes);
  const reviews = await getReviewsData('reviews.json', room);
  addReviews(reviews.reviews);
  const countReviews = document.querySelectorAll('.js-review').length;
  let content;
  if (countReviews === 0) {
    content = '0 отзывов';
  }
  if (countReviews === 1) {
    content = '1 отзыв';
  }
  if (countReviews > 1 && countReviews <= 4) {
    content = `${countReviews} отзыва`;
  }
  if (countReviews > 4) {
    content = `${countReviews} отзывов`;
  }
  document.querySelector('.js-room-details__reviews-title-counter').innerHTML = content;
}

addInfo();
