/* Initialize DOM elements and vars */
let history = document.getElementById("history");
let input = document.getElementById("input");
let operator = '';
let inputActive = false;
const operatorArray = ['÷', '×', '+', '-'];
const nums = Array.from(document.querySelectorAll('.btn-num'));
const funcs = Array.from(document.querySelectorAll('.btn-func'));

/* Create event listeners */
nums.forEach(n => n.addEventListener('click', numInput));
funcs.forEach(f => f.addEventListener('click', operatorInput));

/* Update screen from event listener inputs */
function numInput(e) {
    if (inputActive == false) {
        input.textContent = input.textContent.slice(0, 0);
        input.textContent += e.target.textContent;
        inputActive = true;
    }
    else if (inputActive == true && input.textContent.length <12) {
        input.textContent += e.target.textContent;
    }
};
    // add class to flash screen background red for too long of an entr};

function operatorInput(e) {
    if (operatorArray.includes(e.target.id) && operator === '') {
        operator = e.target.id;
        if (input.textContent == '0') {
            input.textContent = input.textContent.slice(0, 0);
        }
        input.textContent = operator + input.textContent;
        inputActive = true;
    }
    else if (operatorArray.includes(e.target.id) && operator !== '') {
        history.textContent = operate(operator, Number(history.textContent), Number(input.textContent.slice(1)));
        clearInput();
        operator = e.target.id;
        input.textContent = operator;
        inputActive = true;
    }
    else {
        nonMathFunc(e);
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
            history.textContent = operate(operator, Number(history.textContent), Number(input.textContent.slice(1)));
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
            return add(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
        default:
            return null;
    }
};

function deleteChar() {
    input.textContent = input.textContent.slice(0, -1);
    if (input.textContent == '') {
        input.textContent = '0';
        inputActive = false;
    } 
}

function clearInput() {
    input.textContent = '0';
    operator = '';
    inputActive = false;
};

function clearAll() {
        input.textContent = '0';
        history.textContent = '';
        operator = '';
        inputActive = false;
};