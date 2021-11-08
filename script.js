const data = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : {};
const updateLS = () => localStorage.setItem("data", JSON.stringify(data));
const deleteBuy = () => {};
const chMonthNext = () => {
  chosenDate.setMonth(chosenDate.getMonth() + 1);
  document.body.innerHTML = "";
  loadTables();
};
const chMonthPrew = () => {
  chosenDate.setMonth(chosenDate.getMonth() - 1);

  loadTables();
};
const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const createBuy = () => {
  data[year][month][
    Date.now()
  ] = `${buyInput.value},${sumInput.value},${targetInput.value}`;
  updateLS();
};
const loadTables = function () {
  document.body.innerHTML = "";
  let year = chosenDate.getYear();
  let month = chosenDate.getMonth();
  let chosenMonth;
  data[year] = data[year] ? data[year] : {};
  if (data[year][month]) {
    chosenMonth = data[year][month];
  } else {
    data[year][month] = {};
  }
  chosenMonth = data[year][month];
  let sumAll = +0;
  let sumFood = +0;
  let sumLife = +0;
  let sumEntert = +0;
  let h1 = document.createElement("h1");
  document.body.appendChild(h1);
  h1.insertAdjacentHTML(
    "beforeend",
    '<input value="\u{23EA}" onclick="chMonthPrew()" type="button">' +
      monthNames[month] +
      '<input value="\u{23E9}" onclick="chMonthNext()" type="button">'
  );

  document.body.insertAdjacentHTML(
    "beforeend",
    `<table id='firstTable'>
    <tr><th>Дата</th><th>Покупка</th><th>Сумма</th><th>Назначение</th></tr>
  </table>
  <table id='secondTable'>
    <tr><th>Всего</th><th>Продукты</th><th>Быт</th><th>Досуг</th></tr>
    <tr></tr>
  </table>`
  );
  Object.keys(chosenMonth).forEach((key) => {
    const date = new Date(parseInt(key)).getDate();
    let trArray = ([buyName, price, buyTarget] = chosenMonth[key].split(","));
    trArray.unshift(date);
    trArray[2] = parseInt(trArray[2]);
    let tr = document.createElement("tr");
    firstTable.appendChild(tr);
    trArray.forEach(function (item) {
      let td = document.createElement("td");
      td.innerHTML = item;
      tr.appendChild(td);
    });
    let td = document.createElement("td");
    td.id = "inputButton";
    tr.appendChild(td);
    let inputOnclick = document.createElement("input");
    inputOnclick.value = "\u{274C}";
    inputOnclick.type = "button";
    tr.addEventListener("click", deleteBuy);
    td.appendChild(inputOnclick);
    td.setAttribute("data-timeSt", key);
    switch (trArray[3]) {
      case "Еда":
        sumFood += trArray[2];
        break;
      case "Быт":
        sumLife += trArray[2];
        break;
      case "Развлечения":
        sumEntert += trArray[2];
        break;
    }
    sumAll += trArray[2];
  });
  let tr = document.createElement("tr");
  firstTable.appendChild(tr);
  ["date", "buy", "sum"].forEach(function (item) {
    let th = document.createElement("th");
    tr.appendChild(th);
    let input = document.createElement("input");
    input.id = item + "Input";
    input.type = "text";
    th.appendChild(input);
  });
  let thTargetInput = document.createElement("th");
  tr.appendChild(thTargetInput);
  let targetInput = document.createElement("select");
  targetInput.id = "targetInput";
  targetInput.type = text;
  thTargetInput.appendChild(targetInpute);
  let arrSelect = ["Еда", "Быт", "Развлечения"];
  arrSelect.forEach(function (item) {
    let option = document.createElement("option");
    option.value = item;
    option.innerHTML = item;
    targetInput.appendChild(option);
  });
  secondTable.insertAdjacentHTML(
    "beforeend",
    `
 <tr><th>${sumAll}</th>
 <th>${sumFood}</th>
 <th>${sumLife}</th>
 <th>${sumEntert}</th>
 </tr>`
  );
};

let chosenDate = new Date();
loadTables();

