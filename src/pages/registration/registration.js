import './registration.scss';
import '../../main';
import '../../blocks/header/header';
import formValidation from '../../blocks/reg-form/reg-form';

function addLoginButtonListener(reg, login) {
  const loginButton = document.querySelector('.js-reg-form__login-button');
  loginButton.addEventListener('click', () => {
    localStorage.setItem('entry', 'login');
    login.classList.remove('registration__login-form_hidden');
    reg.classList.add('registration__reg-form_hidden');
  });
}

function addRegButtonListener(reg, login) {
  const regButton = document.querySelector('.js-login-form__reg-button');
  regButton.addEventListener('click', () => {
    localStorage.setItem('entry', 'registration');
    login.classList.add('registration__login-form_hidden');
    reg.classList.remove('registration__reg-form_hidden');
  });
}

function showForm() {
  const reg = document.querySelector('.js-registration__reg-form');
  const login = document.querySelector('.js-registration__login-form');
  let entry;
  try {
    entry = localStorage.getItem('entry');
  } catch {
    entry = 'login';
  }
  if (entry === 'registration') {
    reg.classList.remove('registration__reg-form_hidden');
  }
  if (entry === 'login') {
    login.classList.remove('registration__login-form_hidden');
  }
  addRegButtonListener(reg, login);
  addLoginButtonListener(reg, login);
}

window.addEventListener('DOMContentLoaded', () => {
  showForm();
  formValidation();
});
