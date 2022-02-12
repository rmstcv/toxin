function addTotalVotes(votes) {
  const elem = document.querySelector('.js-chart__number');
  elem.innerHTML = votes;
}

function vote(arr) {
  const svg = document.querySelector('.js-chart svg');
  const cx = 60;
  const r = 58;
  const c = 2 * r * Math.PI;
  const dash = 2;
  let totalVotes = 0;
  for (let i = 0; i < arr.length; i += 1) {
    totalVotes += arr[i];
  }
  const voteNames = [
    {
      name: 'bad',
      color1: '#8BA4F9',
      color2: '#3D4975',
    },
    {
      name: 'satisfactory',
      color1: '#BC9CFF',
      color2: '#8BA4F9',
    },
    {
      name: 'good',
      color1: '#6FCF97',
      color2: '#66D2EA',
    },
    {
      name: 'excellent',
      color1: '#FFE39C',
      color2: '#FFBA9C',
    },
  ];
  const circlesArr = [];
  let dashoffsetStart = (c / 100) * 25;
  for (let i = 0; i < voteNames.length; i += 1) {
    if (arr[i] > 0) {
      const dasharray = (c / 100) * ((arr[i] / totalVotes) * 100);
      const circle = `
        <defs>
          <linearGradient id="${voteNames[i].name}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${voteNames[i].color1}" />
            <stop offset="100%" stop-color="${voteNames[i].color2}" />
          </linearGradient>
        </defs>
        <circle class="${voteNames[i].name}" 
          stroke-dasharray="${dasharray - dash} ${c - dasharray + dash}" 
          stroke-dashoffset="${dashoffsetStart - dash}"
          cx=${cx} cy=${cx} r=${r}
          stroke="url(#${voteNames[i].name})">
        </circle>
      `;
      dashoffsetStart -= dasharray;
      circlesArr.push(circle);
    }
  }
  const circles = circlesArr.join('');
  svg.innerHTML = `
    ${circles}
  `;
  addTotalVotes(totalVotes);
}

vote([0, 65, 65, 130]);
