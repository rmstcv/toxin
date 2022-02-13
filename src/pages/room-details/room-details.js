import '../../main';
import '../../main.css';
import addImages from '../../blocks/room-details-images/room-details-images';
import addDetails from '../../blocks/details/details';
import '../../blocks/booking-form/booking-form';
import chart from '../../blocks/chart/chart';
import getJsonData from '../../libs/get-json-data';

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
  chart(data.reviews);
}

addInfo();
