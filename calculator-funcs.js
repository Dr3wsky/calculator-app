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
    input.textContent += e.target.textContent;
};

function updateOperator(e) {
    console.log(e);
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

function clearInput() {
    input.textContent = '';
};

function clearAll() {
    input.textContent = '';
    history.textContent = '';
}