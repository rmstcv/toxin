import addSpace from '../../libs/add-spaces';

function insertRoomInfo(data, elem) {
  const roomNode = elem;
  console.log(data);
  roomNode.innerHTML = `
    <div class ="room-short-info" data-room=${data.room}>
      <div>
        <span class = "room-short-info__num">№</span>
        <span class = "room-short-info__room">${data.room}</span>
        <span class = "room-short-info__class">${data.class}</span>
      </div>
      <div>
        <span class = "room-short-info__price">${addSpace(data.price)}&#8381</span>
        <span class = "room-short-info__text">в сутки</span>
      </div>
    </div>
  `;
}
export default insertRoomInfo;
