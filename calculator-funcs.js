/* Initialize DOM elements */
let history = document.getElementById("history");
let input = document.getElementById("input");
const nums = Array.from(document.querySelectorAll('.btn-num'));
const funcs = Array.from(document.querySelectorAll('.btn-func'));

/* Create event listeners */
nums.forEach(n => n.addEventListener('click', updateInput));
funcs.forEach(f => f.addEventListener('click', updateOperator));

/* Update screen from event listener inputs */
function updateInput(e) {
    if (input.textContent.length < 10) {
        input.textContent += e.target.textContent;
    }
    // add class to flash screen background red for too long of an entry
};

function updateOperator(e) {
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
};

function clearInput() {
    input.textContent = '';
};

function clearAll() {
    input.textContent = '';
    history.textContent = '';
};