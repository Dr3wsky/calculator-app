/* Initialize DOM elements and global vars */
const screen = document.querySelector('.screen');
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

/* Complex logic functions for display and event listener actions */

// Logic when number is pressed
function numInput(e) {
    // If no input yet, erase placeholder zero and add number input
    if (inputActive == false) {
        input.textContent = input.textContent.slice(0, 0);
        input.textContent += e.target.textContent;
        inputActive = true;
    }
    // Continue adding numbers to existing inpout until screen midth reached
    else if (inputActive == true && input.textContent.length <12) {
        input.textContent += e.target.textContent;
    }
    else if (inputActive == true && input.textContent.length == 12) {
        flashRed();
    }
};
    // add class to flash screen background red for too long of an entr};

//Logic when non-number button is pressed
function operatorInput(e) {
    // If no operator is logged, set operator and display on screen at front of input
    if (operatorArray.includes(e.target.id) && operator === '') {
        operator = e.target.id;
        if (input.textContent == '0') {
            input.textContent = input.textContent.slice(0, 0);
        }
        input.textContent = operator + input.textContent;
        inputActive = true;
    }
    // If an operator is already logged, run the active computation, then log and display new operator
    else if (operatorArray.includes(e.target.id) && operator !== '') {  
        history.textContent = operate(operator, Number(history.textContent), Number(input.textContent.slice(1)));
        clearInput();
        operator = e.target.id;
        input.textContent = operator;
        inputActive = true;
    }
    // if no operator is pressed, jump to display modification functions
    else {
        nonMathFunc(e);
    }
};

// switch function to check the non-operator function to run computation and/or update screen
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
            flashGreen();
            clearInput();
            break;
    }
};

//Switch to core operator computation  based on logged operator symbol
function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '×':
            return num1 * num2;
        case '÷':
            return num1 / num2;
        default:
            return null;
    }
};

// Asynch function to wait momentarily and allow screen to flas colour for added class
async function sleep(millseconds) {
    return new Promise(resolve => setTimeout(resolve, millseconds));
};


/*  Display modification functions */
// Flash screen red when max input is reached
async function flashRed() {
    screen.classList.add("screenRed");
    await sleep(75);
    screen.classList.remove("screenRed");
};

//Flash screen green when computation is complete
async function flashGreen() {
    screen.classList.add("screenGreen")
    await sleep(75);
    screen.classList.remove("screenGreen")
};

// Delete (backspace) single charates on input line
function deleteChar() {
    input.textContent = input.textContent.slice(0, -1);
    if (input.textContent == '') {
        input.textContent = '0';
        inputActive = false;
    } 
}

// Clear input and refresh on computation
function clearInput() {
    input.textContent = '0';
    operator = '';
    inputActive = false;
};

// Clear screen and history (full reset)
function clearAll() {
        input.textContent = '0';
        history.textContent = '';
        operator = '';
        inputActive = false;
};
