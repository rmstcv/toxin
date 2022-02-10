function addImages(images) {
  const parent = document.querySelector('.room-details-images');
  parent.innerHTML = `
  <div class="room-details-images__main">
    <img src=${images[3]}>
  </div>
  <div class="room-details-images__second">
    <img src=${images[1]}>
  </div>
  <div class="room-details-images__third">
    <img src=${images[0]}>
  </div>
  `;
}

export default addImages;
