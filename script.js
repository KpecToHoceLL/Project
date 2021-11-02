const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {}
const updateLS = () => localStorage.setItem('data', JSON.stringify(data));
const deleteBuy = () => {
    const key = event.target.timeSt;
    delete data[key];
    updateLS();
}
const chMonthNext = () => {
    data.chosenDate.setMonth(date.getMonth() + 1);
    location.reload();
    updateLS();
}
const chMonthPrew = () => {
    data.chosenDate.setMonth(date.getMonth() - 1);
    location.reload();
    updateLS();
}
const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const createBuy =  () => {
    data[year][month][Date.now()] = `${buyInput.value},${sumInput.value},${targetInput.value}`;
    updateLS()
}
const loadTables = function() {
    let sumAll = +0;
    let sumFood = +0;
    let sumLife = +0;
    let sumEntert = +0;
    heading.insertAdjacentHTML('beforeend', '<input value="\u{23EA}" onclick=chMonthPrew() type="button">' + monthNames[month] + '<input value="\u{23E9}" onclick=chMonthNext() type="button">');
    Object.keys(chosenMonth).forEach(key => {
        const date = new Date(parseInt(key)).getDate();
        let [buy, price, target] = chosenMonth[key].split(',');
        price = parseInt(price);
        firstTable.insertAdjacentHTML('beforeend', `
  <tr><td>${date}</td>
  <td>${buy}</td>
  <td>${price}</td>
  <td>${target}</td>`);
        switch (target) {
            case 'Еда':
                sumFood += price;
                break;
            case 'Быт':
                sumLife += price;
                break;
            case 'Развлечения':
                sumEntert += price;
                break;
                sumAll += price;
        }
    });
    firstTable.insertAdjacentHTML('beforeend', `<tr>
 <th><input type="text" id='dateInput'/></th>
 <th><input type="text" id='buyInput'/></th>
 <th><input type="text" id='sumInput'/></th>
 <th><select id="targetInput">
   <option value="Еда">Еда</option>
   <option value="Быт">Быт</option>
   <option value="Развлечения">Развлечения</option>
 </select></th>
 <th id='inputButton'><input value="\u{2705}" onclick=createBuy() type="button"></th></tr>`);
    secondTable.insertAdjacentHTML('beforeend', `
 <tr><th>${sumAll}</th>
 <th>${sumFood}</th>
 <th>${sumLife}</th>
 <th>${sumEntert}</th>
 </tr>`);
};

data.chosenDate = new Date();
let year = data.chosenDate.getYear();
let month = data.chosenDate.getMonth();
let chosenMonth;
data[year] = data[year] ? data[year] : {}
if (data[year][month]) {
    chosenMonth = data[year][month];
} else {
    data[year][month] = {}
}
chosenMonth = data[year][month];
loadTables();
