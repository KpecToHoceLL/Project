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
const addBuy = () => {
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
  let sumObj = {
    sumAll: +0,
    sumFood: +0,
    sumLife: +0,
    sumEntert: +0,
  };
  let h1 = document.createElement("h1");
  document.body.appendChild(h1);
  let buttonMoPr = document.createElement("input");
  buttonMoPr.value = "\u{23EA}";
  buttonMoPr.type = "button";
  buttonMoPr.addEventListener("click", chMonthPrew);
  h1.appendChild(buttonMoPr);
  let monthName = document.createTextNode(monthNames[month]);
  h1.appendChild(monthName);
  let buttonMoNe = document.createElement("input");
  buttonMoNe.value = "\u{23E9}";
  buttonMoNe.type = "button";
  buttonMoNe.addEventListener("click", chMonthNext);
  h1.appendChild(buttonMoNe);
  {
    let firstTable = document.createElement("table");
    firstTable.id = "firstTable";
    document.body.appendChild(firstTable);
    let tr = document.createElement("tr");
    firstTable.appendChild(tr);
    ["Дата", "Покупка", "Сумма", "Назначение"].forEach(function (item) {
      let th = document.createElement("th");
      th.innerHTML = item;
      tr.appendChild(th);
    });
  }
  {
    let secondTable = document.createElement("table");
    secondTable.id = "secondTable";
    document.body.appendChild(secondTable);
    let tr = document.createElement("tr");
    secondTable.appendChild(tr);
    ["Всего", "Продукты", "Быт", "Досуг"].forEach(function (item) {
      let th = document.createElement("th");
      th.innerHTML = item;
      tr.appendChild(th);
    });
  }
  Object.keys(chosenMonth).forEach((key) => {
    const date = new Date(parseInt(key)).getDate();
    let trArray = [date].concat(
      ([buyName, price, buyTarget] = chosenMonth[key].split(","))
    );
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
    /*let inputOnclick = document.createElement("input");
    inputOnclick.value = "\u{274C}";
    inputOnclick.type = "button";
    inputOnclick.addEventListener("click", deleteBuy);
    td.appendChild(inputOnclick);
    td.setAttribute("data-timeSt", key);

     */
    switch (trArray[3]) {
      case "Еда":
        sumObj.sumFood += trArray[2];
        break;
      case "Быт":
        sumObj.sumLife += trArray[2];
        break;
      case "Развлечения":
        sumObj.sumEntert += trArray[2];
        break;
      default:
        break;
    }
    sumObj.sumAll += trArray[2];
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
  targetInput.type = "text";
  thTargetInput.appendChild(targetInput);
  ["Еда", "Быт", "Развлечения"].forEach(function (item) {
    let option = document.createElement("option");
    option.value = item;
    option.innerHTML = item;
    targetInput.appendChild(option);
  });
  let buttonAddBuy = document.createElement("input");
  buttonAddBuy.value = "\u{2705}";
  buttonAddBuy.type = "button";
  buttonAddBuy.addEventListener("click", addBuy);
  tr.appendChild(buttonAddBuy);
  {
    let tr = document.createElement("tr");
    secondTable.appendChild(tr);
    Object.keys(sumObj).forEach((key) => {
      let th = document.createElement("th");
      th.innerHTML = sumObj[key];
      tr.appendChild(th);
    });
  }
};

let chosenDate = new Date();
loadTables();

