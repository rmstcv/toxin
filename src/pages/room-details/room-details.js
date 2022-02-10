import '../../main';
import '../../main.css';
import addImages from '../../blocks/room-details-images/room-details-images';

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
}

addInfo();
