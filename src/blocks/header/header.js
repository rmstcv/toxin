function addRegHandler() {
  const buttonReg = document.querySelector('.js-header__entry');
  buttonReg.addEventListener('click', (e) => {
    if (e.target.closest('.js-header__button-reg')) {
      localStorage.setItem('entry', 'registration');
    }
    if (e.target.closest('.js-header__button-login')) {
      localStorage.setItem('entry', 'login');
    }
    window.location.href = 'registration.html';
  });
}

addRegHandler();
