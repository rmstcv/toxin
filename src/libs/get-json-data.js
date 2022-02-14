async function getJsonData(url, room) {
  const err = {
    room: 'error',
    class: '',
    price: '',
    stars: '0',
    reviews: '0',
    images: [''],
    details: {
      comfort: '',
      convenience: '',
      cosiness: '',
    },
    votes: [0, 65, 65, 130],
    rules: [1, 2, 3],
  };
  let roomInfo;
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    for (let i = 0; i < jsonData.length; i += 1) {
      if (jsonData[i].room === room) {
        roomInfo = jsonData[i];
        break;
      }
    }
  } catch {
    roomInfo = err;
  }
  const imgs = [];
  let img;
  for (let i = 0; i < 4; i += 1) {
    img = `assets/images/rooms/room${roomInfo.room}-${i}.jpg`;
    imgs.unshift(img);
  }
  roomInfo.images = imgs;
  roomInfo.details = {
    comfort: 'Шумопоглощающие стены',
    convenience: 'Окно в каждой из спален',
    cosiness: 'Номер оснащен камином',
  };
  roomInfo.votes = [0, 65, 65, 130];
  roomInfo.rules = [1, 2, 3];
  return roomInfo;
}

export default getJsonData;
