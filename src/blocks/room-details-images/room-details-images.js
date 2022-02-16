function addImages(images) {
  const parent = document.querySelector('.room-details-images');
  parent.innerHTML = `
  <div class="room-details-images__main">
    <img src=${images[3]} alt="image" loading="lazy" width="979" height="485">
  </div>
  <div class="room-details-images__second">
    <img src=${images[1]} alt="image" loading="lazy" width="459" height="240">
  </div>
  <div class="room-details-images__third">
    <img src=${images[0]} alt="image" loading="lazy" width="459" height="240">
  </div>
  `;
}

export default addImages;
