//Selecting display screen and All buttons
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');
const buttons = document.querySelectorAll('.btn');

//Calculator state variable

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let resetScreen = false;

//Entery numbes & display updater

function appendNumber(number) {
    if (currentOperand === '0' || resetScreen){
        currentOperand = '';
        resetScreen = false;
    }
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand += number;
    }


function updateScreen() {
    currentOperandTextElement.innerText = currentOperand;
    if(operation != null) {
        previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
}

function chooseOperation(op){
    if(currentOperand === '') return;
    if(previousOperand !== ''){
        compute();
    } 
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if(isNaN(prev) || isNaN(current)) return;

    switch(operation){
        case '+':
        computation = prev + current;
        break;
        case '-':
        computation = prev - current;
        break;
        case '×':
        computation = prev * current;
        break;
        case '÷':
        computation = prev / current;
        break;
        default: 
        return; 
    }
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    resetScreen = true;

    }

//Clear delete and event listener

function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
}

function deleteNumber() {
if (currentOperand.length === 1){
    currentOperand = '0';
} else{
    currentOperand = currentOperand.toString().slice(0,-1);
}
}

//Event listener add for all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.classList.contains('number')){
            appendNumber(button.innerText);
            updateScreen();
        } else if(button.classList.contains('operator')){
            if(button.dataset.action === 'percent'){
                currentOperand = (parseFloat(currentOperand) / 100).toString();
                updateScreen();
                return;
            }
            chooseOperation(button.innerText);
            updateScreen();
       } else if (button.classList.contains('equals')){
        compute();
        updateScreen();
       } else if (button.dataset.action === 'clear'){
        clear();
        updateScreen();
       } else if (button.dataset.action === 'delete'){
        deleteNumber();
        updateScreen();
       }
    });
});
