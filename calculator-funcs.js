/* Initialize DOM elements and vars */
let history = document.getElementById("history");
let input = document.getElementById("input");
let operator = '';
const operatorArray = ['/', '*', '+', '-'];
const nums = Array.from(document.querySelectorAll('.btn-num'));
const funcs = Array.from(document.querySelectorAll('.btn-func'));

/* Create event listeners */
nums.forEach(n => n.addEventListener('click', numInput));
funcs.forEach(f => f.addEventListener('click', operatorInput));

/* Update screen from event listener inputs */
function numInput(e) {
    if (input.textContent.length == 1 && input.textContent == '0') {
        return input.textContent = e.target.textContent;
    }
    if (input.textContent.length == 1 && input.textContent !== '0') {
        return input.textContent += e.target.textContent;
    }
    if (input.textContent.length > 1 && input.textContent.length < 10) {
        return input.textContent += e.target.textContent;
    }
};
    // add class to flash screen background red for too long of an entr};

function operatorInput(e) {
    if (operatorArray.includes(e.target.id) && operator === '') {
        operator = e.target.id;
        input.textContent = operator + input.textContent;
    }
    else if (operatorArray.includes(e.target.id) && operator !== '') {
        history.textContent = operate(operator, Number(history.textContent), Number(input.textContent.slice(1)));
        clearInput();
        operator = e.target.id;
        input.textContent = operator + input.textContent;
    }
    else {
        nonMathFunc();
    }
};

function nonMathFunc(e) {
    switch (e.target.id) {
        case 'clear-all':
            clearAll();
            break;
        case 'delete':
            deleteChar();
            break;
        case 'equals':
            history.textContent = operate(operator, Number(history.textContent), Number(input.textContent.slice(1))) //Need to change these to numbers
            clearInput();
            break;
    }
};


/*  Set core operator functions */
function add(num1, num2) {
    return (num1 + num2);
};

function subtract(num1, num2) {
    return (num1 - num2);
};

function multiply(num1, num2) {
    return (num1 * num2);
};

function divide(num1, num2) {
    return (num1 / num2);
};

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
};

function deleteChar() {
    input.textContent = input.textContent.slice(0, -1);
    if (input.textContent = '') {
        input.textContent = '0';
    }
};

function clearInput() {
    input.textContent = '0';
    operator = '';
};

function clearAll() {
    input.textContent = '0';
    history.textContent = '';
    operator = '';
};