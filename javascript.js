const calcInputNode = document.querySelector('.calculator-input');
let inputString = '';

//buttons who's inputs get displayed
document.querySelectorAll('button.display').forEach((button) => {
    button.addEventListener('click', () => {
        calcInputNode.innerText += button.dataset.display;
        inputString += button.dataset.display;
    });
});
//clear button
document.querySelector('button#clear').addEventListener('click', () => {
    calcInputNode.innerText = '';
    inputString = '';
});
//delete button
document.querySelector('button#delete').addEventListener('click', () => {
    calcInputNode.innerText = calcInputNode.innerText.slice(0,-1);
    inputString = inputString.slice(0,-1);
});


function add(a,b) {
    console.log(`${a} + ${b} = ${a+b}`);
    return a + b;
}

function subtract(a,b) {
    console.log(`${a} - ${b} = ${a-b}`);
    return a - b;
}

function multiply(a,b) {
    console.log(`${a} x ${b} = ${a*b}`);
    return a * b;
}

function divide(a,b) {
    console.log(`${a} / ${b} = ${a/b}`);
    return a/b;
}

function operate(a,op,b) {
    return op(a,b);
}