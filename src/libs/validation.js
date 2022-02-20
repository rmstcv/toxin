function check(selector, condition) {
  const inputs = document.querySelectorAll(selector);
  inputs.forEach((input) => {
    input.addEventListener('keypress', (e) => {
      if (!e.key.match(condition)) {
        e.preventDefault();
      }
    });
  });
}

function checkName(selector) {
  const condition = /[а-яёa-z]/ig;
  check(selector, condition);
}

function checkEmail(selector) {
  const condition = /[a-z0-9.@]/ig;
  check(selector, condition);
}

function checkDate(selector) {
  const inputs = document.querySelectorAll(selector);
  inputs.forEach((item) => {
    item.addEventListener('keypress', (e) => {
      const input = item;
      if (e.key.match(/\D/g)) {
        e.preventDefault();
      }
      if (input.value.length === 0) {
        if (e.key.match(/[^0-3]/g)) {
          e.preventDefault();
        }
      }
      if (input.value.length === 1) {
        if (input.value.slice(0) === '3') {
          if (e.key.match(/[^0-1]/g)) {
            e.preventDefault();
          }
        }
      }
      if (input.value.length === 2) {
        input.value += '.';
      }
      if (input.value.length === 3) {
        if (e.key.match(/[^0-1]/g)) {
          e.preventDefault();
        }
      }
      if (input.value.length === 4) {
        if (input.value.slice(3) === '1') {
          if (e.key.match(/[^0-2]/g)) {
            e.preventDefault();
          }
        }
      }
      if (input.value.length === 5) {
        input.value += '.';
      }
      if (input.value.length === 6) {
        if (e.key.match(/[^1-2]/g)) {
          e.preventDefault();
        }
      }
      if (input.value.length === 7) {
        if (input.value.slice(6) === '1') {
          if (e.key.match(/[^9]/g)) {
            e.preventDefault();
          }
        }
        if (input.value.slice(6) === '2') {
          if (e.key.match(/[^0]/g)) {
            e.preventDefault();
          }
        }
      }
      if (input.value.length === 8) {
        if (input.value.slice(7) === '0') {
          if (e.key.match(/[^0-2]/g)) {
            e.preventDefault();
          }
        }
        if (input.value.slice(7) === '9') {
          if (e.key.match(/[^2-9]/g)) {
            e.preventDefault();
          }
        }
      }
      if (input.value.length === 9) {
        if (input.value.slice(8) === '2' && input.value.slice(7, 8) === '0') {
          if (e.key.match(/[^0]/g)) {
            e.preventDefault();
          }
        }
      }
      if (input.value.length >= 10) {
        e.preventDefault();
      }
    });
  });
}

export { checkName, checkEmail, checkDate };
