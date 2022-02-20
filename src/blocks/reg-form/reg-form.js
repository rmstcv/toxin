import { checkName, checkEmail, checkDate } from '../../libs/validation';

function formValidation() {
  checkName('input[data-name="name"]');
  checkEmail('input[type="email"]');
  checkDate('input[data-name="date"]');
}

export default formValidation;
