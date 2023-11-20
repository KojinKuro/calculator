const calcInputNode = document.querySelector(".calculator-input");
const calcResultNode = document.querySelector(".calculator-result");
const calcButtonNode = document.querySelector('.calculator-buttons');
let inputString = "";
let decimalDisabled = false;

calcButtonNode.addEventListener("click", (e) => {
  let lastInput = inputString.slice(-1);
  switch(e.target.className) {
    case 'function':
      if (inputString == "") return;

      decimalDisabled = false;
      if (isOperation(lastInput)) inputString = inputString.slice(0, -1);
      inputString += e.target.dataset.display;
      break;
    case 'display':
      inputString += e.target.dataset.display;
      break;
    case 'decimal':
      if (decimalDisabled) return;
      decimalDisabled = true;

      if (isOperation(lastInput) || lastInput == "" || lastInput == "=")
        inputString += "0";
      inputString += e.target.dataset.display;
      break;
    case 'equal':
      calcResultNode.innerText = operateArray(formatInput(inputString));
      break;
    case 'clear':
      inputString = "";
      decimalDisabled = false;
      break;
    case 'delete':
      if (lastInput == ".") decimalDisabled = false;
      inputString = inputString.slice(0, -1);
  }

  if (e.target.className != 'equal') calcInputNode.innerText = inputString;
});

function add(a, b) {
  console.log(`${a} + ${b} = ${a + b}`);
  return a + b;
}

function subtract(a, b) {
  console.log(`${a} - ${b} = ${a - b}`);
  return a - b;
}

function multiply(a, b) {
  console.log(`${a} x ${b} = ${a * b}`);
  return a * b;
}

function divide(a, b) {
  console.log(`${a} / ${b} = ${a / b}`);
  return a / b;
}

function operate(a, op, b) {
  return op(a, b);
}

function isOperation(text) {
  return text === "+" || text === "-" || text === "x" || text === "/";
}

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function convertToNum(str) {
  if (typeof str != "string") return;
  return str * 1;
}

function convertToOp(str) {
  switch (str) {
    case "+":
      return add;
    case "-":
      return subtract;
    case "x":
      return multiply;
    case "/":
      return divide;
  }
}

function formatInput(str) {
  let strArray = str.split("");
  let data = [];
  let curNum = "";

  while (strArray.length) {
    let firstStrVal = strArray.shift();
    if (isNumeric(`${curNum}${firstStrVal}`)) {
      curNum += firstStrVal;
      if (!strArray.length) data.push(convertToNum(curNum));
    } else {
      data.push(convertToNum(curNum));
      data.push(convertToOp(firstStrVal));
      curNum = "";
    }
  }

  if (data.length % 2 == 0) {
    if (data[data.length - 1] == add || data[data.length - 1] == subtract)
      data.push(0);
    else if (
      data[data.length - 1] == multiply ||
      data[data.length - 1] == divide
    )
      data.push(1);
  }

  return data;
}

function operateArray(arr) {
  if (!arr.length) return 0;

  let arrCopy = arr;
  while (arr.length >= 3)
    arrCopy.unshift(operate(arrCopy.shift(), arrCopy.shift(), arrCopy.shift()));
  return arrCopy.shift();
}
