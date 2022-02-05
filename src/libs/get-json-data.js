async function getJsonData(url, room) {
  const err = {
    room: 'error',
    class: '',
    price: '',
    stars: '0',
    reviews: '0',
    images: [''],
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
  return roomInfo;
}

export default getJsonData;
