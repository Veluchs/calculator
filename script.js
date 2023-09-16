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

function selectNumber(number) {
    let operators = "*%-+/";
    if (operators.includes(displayValue)) {
        displayValue = "";
    }

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

function selectOperator(op) {
    if (!operator) {
        firstNumber = Number(displayValue);
    }
    if (operator && firstNumber) {
        secondNumber = Number(displayValue);
        firstNumber = operate(operator, firstNumber, secondNumber);
    }
    operator = operatorObj[op];
    displayValue = op;
    refreshScreen();
}

function calculate() {
    if (!operator || !firstNumber) {
        return;
    }
    if (isNaN(displayValue)) {
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

    let operators = "*%-+/";
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
    "/": divide,
};

document.querySelectorAll(".number").forEach( button => button.addEventListener("click", (e) => selectNumber(e.target.textContent)));
document.querySelectorAll(".operator").forEach( button => button.addEventListener("click", (e) => selectOperator(e.target.textContent)));
document.querySelector("#clear").addEventListener("click", clearCalculatorScreen);
document.querySelector("#delete").addEventListener("click", deleteLastInput);
document.querySelector("#equal").addEventListener("click", calculate);
document.querySelector("#decimalPoint").addEventListener("click", addDecimalPoint);

// keyboard support

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    operators = "+-*/%";
    numbers = '123456789';
    if (numbers.includes(e.key)) {
        selectNumber(e.key);
    }
    if (operators.includes(e.key)) {
        selectOperator(e.key);
    }
    if (e.key == '=' || e.key == 'Enter') {
        calculate();
    }
    if (e.key == '.' || e.key == ",") {
        addDecimalPoint();
    }
    if (e.key == 'Backspace') {
        deleteLastInput();
    }
    if (e.key == 'Delete') {
        clearCalculatorScreen();
    }
    }
);
