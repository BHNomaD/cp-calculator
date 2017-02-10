
let display = document.querySelector("#display");
let resultVal = document.querySelector("#result");

let numpad = document.getElementsByClassName("numpad");
let opPad = document.getElementsByClassName("operator");

var input = [0, 0];
var isValidInput = [false, false];
var operator = 0;
var currentNumber = 0;
var result;

function reset() {
    input = [0, 0];
    isValidInput = [false, false];
    operator = 0;    
    currentNumber = 0;
    display.value = "";
    resultVal.value = "";
}

function setOperator(op) {
    if( op.valueOf() == "+".valueOf() ) return 1;
    else if( op.valueOf() == "-".valueOf() ) return 2;
    else if( op.valueOf() == "*".valueOf() ) return 4;
    else if( op.valueOf() == "/".valueOf() ) return 8;
}

function process() {
    if(operator == 1) return input[ 0 ] + input[ 1 ];
    else if(operator == 2) return input[ 0 ] - input[ 1 ];
    else if(operator == 4) return input[ 0 ] * input[ 1 ];
    else if(operator == 8) return input[ 0 ] / input[ 1 ];
}

Array.from(numpad).forEach(function(element) {
    element.addEventListener('click', () => {
        addDigitToCurrentNumber(parseInt(element.value));
        element.blur();
}, false)});

function addDigitToCurrentNumber(digit) {
    input[ currentNumber ] = input[ currentNumber ] * 10 + digit;
    isValidInput[ currentNumber ] = true;
    display.value = display.value.concat(digit);
}

Array.from(opPad).forEach(function(element) {
    element.addEventListener('click', () => {
        processOperator(element.value);
        element.blur();
}, false)});

function processOperator(operator_str) {
    if(isValidInput[0]==false) {
        //DO NOTHING
    } else if(isValidInput[0]==true && isValidInput[1]==false) {
        currentNumber = 1;
        operator = setOperator(operator_str);
        display.value = display.value.concat(operator_str);
    } else if(isValidInput[0]==true && isValidInput[1]==true) {
        result = process();
        resultVal.value = result;
        input[ 0 ] = result;
        input[ 1 ] = 0;
        isValidInput[1] = false;
        operator = setOperator(operator_str);
        currentNumber = 1;
        display.value = result.toString().concat(operator_str);
    }
}

document.getElementById("btn_eq").addEventListener("click", () => {
    processEqual();
});

function processEqual() {
    if(isValidInput[0]==true && isValidInput[1]==true) {
        result = process();
        resultVal.value = result;
        input[ 0 ] = result;
        input[ 1 ] = 0;
        isValidInput[1] = false;
        operator = 0;
        currentNumber = 0;
        display.value = result.toString();
    }
}

document.addEventListener("keydown", (e) => {
    if(e.key === "0" || e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4"
       || e.key === "5" || e.key === "6" || e.key === "7" || e.key === "8" || e.key === "9") {
        addDigitToCurrentNumber(parseInt(e.key));
    } else if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        processOperator(e.key);
    } else if(e.key === "Enter") {
        processEqual();
    }
});

document.getElementById("btn_C").addEventListener("click", () => {
    reset();
    document.activeElement.blur();
});
