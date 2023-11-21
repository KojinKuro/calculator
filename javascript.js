const calcInputNode = document.querySelector(".calculator-input");
const calcResultNode = document.querySelector(".calculator-result");
const calcButtonNode = document.querySelector(".calculator-buttons");
const lightDNode = document.getElementById("light-decimal");
const lightENode = document.getElementById("light-equal");

let inputHandler = {
  inputString: "",
  decimalDisabled: false,
  equalMode: false,
  number: (number) => {
    if (inputHandler.equalMode) {
      inputHandler.equalMode = inputHandler.decimalDisabled = false;
      inputHandler.inputString = "";
    }
    inputHandler.inputString += number;
    calcInputNode.innerText = inputHandler.inputString;
  },
  decimal: () => {
    if (inputHandler.decimalDisabled) return;
    inputHandler.decimalDisabled = true;

    if (inputHandler.equalMode) {
      inputHandler.equalMode = false;
      inputHandler.inputString = "";
    }

    if ( isOperation(getLastInput()) || getLastInput() == "" || getLastInput() == "=" )
      inputHandler.inputString += "0";
    inputHandler.inputString += ".";
    calcInputNode.innerText = inputHandler.inputString;
  },
  operation: (symbol) => {
    if (inputHandler.inputString == "") return;
    if (inputHandler.equalMode) {
      inputHandler.equalMode = false;
      inputHandler.inputString = calcResultNode.innerText;
    }

    inputHandler.decimalDisabled = false;
    if (isOperation(getLastInput()))
      inputHandler.inputString = inputHandler.inputString.slice(0, -1);
    inputHandler.inputString += symbol;
    calcInputNode.innerText = inputHandler.inputString;
  },
  equal: () => {
    if (inputHandler.equalMode) {
      let fArr = formatInput(inputHandler.inputString);
      if (fArr.length >= 3)
        inputHandler.inputString += `${fArr[fArr.length - 2]}${
          fArr[fArr.length - 1]
        }`;
    }

    inputHandler.equalMode = true;
    calcResultNode.innerText = operateArray(
      formatInput(inputHandler.inputString)
    );
    calcInputNode.innerText = inputHandler.inputString;
  },
  clear: () => {
    inputHandler.inputString = calcResultNode.innerText = "";
    inputHandler.equalMode = inputHandler.decimalDisabled = false;
    calcInputNode.innerText = inputHandler.inputString;
  },
  delete: () => {
    if (getLastInput() == ".") inputHandler.decimalDisabled = false;
    inputHandler.equalMode = false;
    inputHandler.inputString = inputHandler.inputString.slice(0, -1);
    calcInputNode.innerText = inputHandler.inputString;
  },
};

function getLastInput() {
  return inputHandler.inputString.slice(-1);
}

window.addEventListener("light_update", () => {
  switch (inputHandler.decimalDisabled) {
    case true:
      lightDNode.classList.add("glow");
      break;
    case false:
      lightDNode.classList.remove("glow");
      break;
  }
  switch (inputHandler.equalMode) {
    case true:
      lightENode.classList.add("glow");
      break;
    case false:
      lightENode.classList.remove("glow");
      break;
  }
});

calcButtonNode.addEventListener("click", (e) => {
  switch (e.target.className) {
    case "operation":
      inputHandler.operation(e.target.dataset.display);
      break;
    case "number":
      inputHandler.number(e.target.dataset.display);
      break;
    case "decimal":
      inputHandler.decimal();
      break;
    case "equal":
      inputHandler.equal();
      break;
    case "clear":
      inputHandler.clear();
      break;
    case "delete":
      inputHandler.delete();
      break;
  }

  const lightEvent = new Event("light_update");
  window.dispatchEvent(lightEvent);
});

window.addEventListener("keyup", (e) => {
  e.preventDefault();
  switch (e.code) {
    case "Digit1":
      inputHandler.number("1");
      break;
    case "Digit2":
      inputHandler.number("2");
      break;
    case "Digit3":
      inputHandler.number("3");
      break;
    case "Digit4":
      inputHandler.number("4");
      break;
    case "Digit5":
      inputHandler.number("5");
      break;
    case "Digit6":
      inputHandler.number("6");
      break;
    case "Digit7":
      inputHandler.number("7");
      break;
    case "Digit8":
      if (e.shiftKey) { inputHandler.operation("x"); }
      else { inputHandler.number("8"); }
      break;
    case "Digit9":
      inputHandler.number("9");
      break;
    case "Digit0":
      inputHandler.number("0");
      break;
    case "Minus":
      inputHandler.operation("-");
      break;
    case "Enter":
    case "Equal":
      if (e.shiftKey) { inputHandler.operation("+"); }
      else { inputHandler.equal(); }
      break;
    case "Slash":
      inputHandler.operation("/");
      break;
    case "Period":
      inputHandler.decimal();
      break;
    case "KeyX":
      inputHandler.operation('x');
      break;
    case "Escape":
      inputHandler.clear();
      break;
    case "Backspace":
      inputHandler.delete();
      break;
  }

  const lightEvent = new Event("light_update");
  window.dispatchEvent(lightEvent);
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

  if (data.length % 2 == 0) { 
    data.pop();
    inputHandler.inputString = inputHandler.inputString.slice(0,-1);
  };
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
