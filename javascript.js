const calcInputNode = document.querySelector(".calculator-input");
const calcResultNode = document.querySelector(".calculator-result");
const calcButtonNode = document.querySelector('.calculator-buttons');
let inputString = "";
let decimalDisabled = false;

// //buttons who's inputs get displayed
// document.querySelectorAll("button.display").forEach((button) => {
//   button.addEventListener("click", () => {
//     inputString += button.dataset.display;
//     calcInputNode.innerText = inputString;
//   });
// });
// //same as above but for functions which have special rules
// document.querySelectorAll("button.function").forEach((button) => {
//   button.addEventListener("click", () => {
//     if (inputString == "") return;
    
//     decimalDisabled = false;

//     let lastInput = inputString.slice(-1);
//     if (isOperation(lastInput)) inputString = inputString.slice(0, -1);
//     inputString += button.dataset.display;
//     calcInputNode.innerText = inputString;
//   });
// });
// //handles decimal button
// document.querySelector("button.decimal").addEventListener("click", () => {
//   if (decimalDisabled) return;

//   let lastInput = inputString.slice(-1);
//   if (isOperation(lastInput) || lastInput == "" || lastInput == "=")
//     inputString += "0";
//   inputString += document.querySelector("button.decimal").dataset.display;
//   calcInputNode.innerText = inputString;
//   decimalDisabled = true;
// });
// //equal code
// document.querySelector("button.equal").addEventListener("click", () => {
//   calcResultNode.innerText = operateArray(formatInput(inputString));
// });
// //clear button
// document.querySelector("button.clear").addEventListener("click", () => {
//   inputString = "";
//   decimalDisabled = false;
//   calcInputNode.innerText = inputString;
// });
// //delete button
// document.querySelector("button.delete").addEventListener("click", () => {
//   let lastInput = inputString.slice(-1);
//   if (lastInput == ".") decimalDisabled = false;
//   inputString = inputString.slice(0, -1);
//   calcInputNode.innerText = inputString;
// });

calcButtonNode.addEventListener("click", (e) => {
  let lastInput = inputString.slice(-1);
  switch(e.target.className) {
    case 'display':
      inputString += e.target.dataset.display;
      calcInputNode.innerText = inputString;
      break;
    case 'function':
      if (inputString == "") return;
    
      decimalDisabled = false;

      if (isOperation(lastInput)) inputString = inputString.slice(0, -1);
      inputString += e.target.dataset.display;
      calcInputNode.innerText = inputString;
      break;
    case 'decimal':
      if (decimalDisabled) return;

      if (isOperation(lastInput) || lastInput == "" || lastInput == "=")
        inputString += "0";
      inputString += e.target.dataset.display;
      calcInputNode.innerText = inputString;
      decimalDisabled = true;
      break;
    case 'equal':
      calcResultNode.innerText = operateArray(formatInput(inputString));
      break;
    case 'clear':
      inputString = "";
      decimalDisabled = false;
      calcInputNode.innerText = inputString;
      break;
    case 'delete':
      if (lastInput == ".") decimalDisabled = false;
      inputString = inputString.slice(0, -1);
      calcInputNode.innerText = inputString;
  }
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
  let curInput = "";

  while (strArray.length) {
    let strFirst = strArray.shift();
    if (isNumeric(`${curInput}${strFirst}`)) {
      curInput += strFirst;
      if (!strArray.length) data.push(convertToNum(curInput));
    } else {
      data.push(convertToNum(curInput));
      curInput = "";
      data.push(convertToOp(strFirst));
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
