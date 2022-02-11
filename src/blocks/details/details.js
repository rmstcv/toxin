function addDescription(data) {
  const details = Object.entries(data);
  for (let i = 0; i < details.length; i += 1) {
    const [name, text] = details[i];
    document.querySelector(`.details__text_${name}`).innerHTML = text;
  }
}

export default addDescription;
