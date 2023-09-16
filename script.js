function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}

function refreshScreen() {
    screen.textContent = displayValue;
}

function selectNumber() {
    let operators = "*%-+";
    if (operators.includes(displayValue)) {
        displayValue = "";
    }
    let number = this.textContent;
    displayValue += number;
    refreshScreen();
}

function clearCalculatorScreen() {
    displayValue = "";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    refreshScreen();
}

function deleteLastInput() {
    displayValue = displayValue.slice(0, -1);
    refreshScreen();
}

function selectOperator() {
    if (!operator) {
        firstNumber = Number(displayValue);
    }
    if (operator && firstNumber) {
        secondNumber = Number(displayValue);
        firstNumber = operate(operator, firstNumber, secondNumber);
    }
    operator = operatorObj[this.textContent];
    displayValue = this.textContent;
    refreshScreen();
}

function calculate() {
    if (!operator || !firstNumber) {
        return;
    }
    secondNumber = Number(displayValue);
    result = operate(operator, firstNumber, secondNumber);
    displayValue = result.toString();

    firstNumber = result;
    operator = null;
    secondNumber = null;

    refreshScreen();
}

function addDecimalPoint() {
    if (displayValue.includes(".")) {
        return;
    }

    let operators = "*%-+";
    if (operators.includes(displayValue)) {
        displayValue = "0";
    }
    displayValue += ".";
    refreshScreen();
}

let firstNumber, secondNumber, operator;
let displayValue = "";

const screen = document.querySelector("#screen");
const operatorObj = {
    "-": substract,
    "+": add,
    "*": multiply,
    "%": divide,
};

document.querySelectorAll(".number").forEach( button => button.addEventListener("click", selectNumber));
document.querySelectorAll(".operator").forEach( button => button.addEventListener("click", selectOperator));
document.querySelector("#clear").addEventListener("click", clearCalculatorScreen);
document.querySelector("#delete").addEventListener("click", deleteLastInput);
document.querySelector("#equal").addEventListener("click", calculate);
document.querySelector("#decimalPoint").addEventListener("click", addDecimalPoint);
