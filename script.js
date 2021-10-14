const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {}
const updateLS = () => localStorage.setItem('data', JSON.stringify(data));
const deleteBuy = () => {
  const key = event.target.timeSt;
  delete data[key];
  updateLS();
}
const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const createBuy =  () => {
updateLS()
}
const loadTables = function() {
  let sumAll = sumFood = sumLife = sumEntert = +0;
  heading.insertAdjacentHTML('beforeend', monthNames['month']);
for(key in chosenMonth) {
  let date = new Date(+key).getDate();
  let [buy, price, target] = data[key].split(',');
  price = +price;
  firstTable.insertAdjacentHTML('beforeend', `
  <tr><th>${date}</th>
  <th>${buy}</th>
  <th>${price}</th>
  <th>${target}</th>
  <th class='deleteButton'><input value="\u{274C}" onclick=deleteBuy data-timeSt=${key} type="button"></th></tr>`);
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
  sumAll +=price;
 };
 firstTable.insertAdjacentHTML('beforeend', `<tr>
 <th><input type="text" id='dateInput'></input></th>
 <th><input type="text" id='buyInput'></input></th>
 <th><input type="text" id='sumInput'></input></th>
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
 }
};
let chosenDate = new Date();
let year = chosenDate.getYear();
let month = chosenDate.getMonth();
let chosenMonth;
data['year'] = data['year'] ? data['year'] : {}
if (data['year']['month']) {
  chosenMonth = data['year']['month'];
} else {
  data['year']['month'] = {}
}
loadTables()
