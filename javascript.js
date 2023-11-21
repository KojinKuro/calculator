const calcInputNode = document.querySelector(".calculator-input");
const calcResultNode = document.querySelector(".calculator-result");
const calcButtonNode = document.querySelector(".calculator-buttons");
let inputString = "";
let decimalDisabled = false;
let equalMode = false;

calcButtonNode.addEventListener("click", (e) => {
  let lastInput = inputString.slice(-1);
  switch (e.target.className) {
    case "function":
      if (inputString == "") return;
      if (equalMode) {
        equalMode = false;
        inputString = calcResultNode.innerText;
      }

      decimalDisabled = false;
      if (isOperation(lastInput)) inputString = inputString.slice(0, -1);
      inputString += e.target.dataset.display;
      break;
    case "display":
      if (equalMode) {
        equalMode = decimalDisabled = false;
        inputString = "";
      }
      inputString += e.target.dataset.display;
      break;
    case "decimal":
      if (decimalDisabled) return;
      decimalDisabled = true;

      if (equalMode) {
        equalMode = false;
        inputString = "";
      }

      if (isOperation(lastInput) || lastInput == "" || lastInput == "=")
        inputString += "0";
      inputString += e.target.dataset.display;
      break;
    case "equal":
      if (equalMode) {
        let fArr = formatInput(inputString);
        inputString += `${fArr[fArr.length - 2]}${fArr[fArr.length - 1]}`;
      }

      equalMode = true;
      calcResultNode.innerText = operateArray(formatInput(inputString));
      break;
    case "clear":
      inputString = "";
      equalMode = decimalDisabled = false;
      break;
    case "delete":
      if (lastInput == ".") decimalDisabled = false;
      equalMode = false;
      inputString = inputString.slice(0, -1);
  }
  calcInputNode.innerText = inputString;
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
      data.push(firstStrVal);
      curNum = "";
    }
  }

  if (data.length % 2 == 0)
    data.pop();  
  return data;
}

function operateArray(arr) {
  console.log(`Beginning to compute.`);
  if (!arr.length) return 0;

  let arrCopy = arr;
  while (arr.length >= 3)
    arrCopy.unshift(
      operate(arrCopy.shift(), convertToOp(arrCopy.shift()), arrCopy.shift())
    );
  return arrCopy.shift();
}
