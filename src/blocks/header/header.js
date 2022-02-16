function addRegHandler() {
  const buttonReg = document.querySelector('.js-header__button-reg');
  buttonReg.addEventListener('click', () => {
    window.location.href = 'registration.html';
  });
}

addRegHandler();
