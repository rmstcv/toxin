async function getReviewsData(url, room) {
  const err = [
    {
      room: 888,
      reviews: {
        id: '',
        name: '',
        text: '',
        date: '',
        likes: '',
        avatar: '',
      },
    },
  ];
  let reviews;
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    for (let i = 0; i < jsonData.length; i += 1) {
      if (jsonData[i].room === room) {
        reviews = jsonData[i];
        break;
      }
    }
  } catch {
    reviews = err;
  }
  return reviews;
}

export default getReviewsData;
