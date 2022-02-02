function addSpaces(num) {
  const digitNum = num.toString().split('');
  const digitNumNew = [];
  for (let i = 0; i < digitNum.length; i += 1) {
    digitNumNew.unshift(digitNum[digitNum.length - 1 - i]);
    if ((i + 1) % 3 === 0) {
      digitNumNew.unshift(' ');
    }
  }
  return digitNumNew.join('');
}

export default addSpaces;
