function rulesList(data) {
  const rulesElement = document.querySelector('.js-rules-list');
  const rules = [
    {
      id: 1,
      text: 'Нельзя с питомцами',
    },
    {
      id: 2,
      text: 'Без вечеринок и мероприятий',
    },
    {
      id: 3,
      text: 'Время прибытия — после 13:00, а выезд до 12:00',
    },
  ];
  const list = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    if (data[i]) {
      rules.forEach((rule) => {
        if (rule.id === data[i]) {
          const item = document.createElement('li');
          item.innerHTML = `
            <div>${rule.text}</div>
          `;
          list.appendChild(item);
        }
      });
    }
    // id = data[i];
    // item = document.createElement('li');
    // item.innerHTML = rules[id];
    // list.appendChild(item);
  }
  rulesElement.appendChild(list);
}

export default rulesList;
