
var mathjs = require("mathjs");

let display = document.querySelector("#display");
let resultVal = document.querySelector("#result");

let numpad = document.getElementsByClassName("numpad");
let opPad = document.getElementsByClassName("operator");

var input = ["", ""];
var isValidInput = [false, false];
// var isDecimalPointAdded = [false, false];
var operator = 0;
var currentNumber = 0;
var result;

function reset() {
    input = ["", ""];
    isValidInput = [false, false];
    // isDecimalPointAdded = [false, false];
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

    var dec_1 = input[ 0 ].includes(".")? (input[ 0 ].length - input[ 0 ].indexOf(".") - 1) : 0;
    var dec_2 = input[ 1 ].includes(".")? (input[ 1 ].length - input[ 1 ].indexOf(".") - 1) : 0;
    var dec = ( dec_1 > dec_2 ) ? dec_1 : dec_2;

    if(operator == 1) return (parseFloat(input[ 0 ]) + parseFloat(input[ 1 ])).toFixed(dec);
    else if(operator == 2) return (parseFloat(input[ 0 ]) - parseFloat(input[ 1 ])).toFixed(dec);
    else if(operator == 4) return (parseFloat(input[ 0 ]) * parseFloat(input[ 1 ])).toFixed(dec);
    else if(operator == 8) return (parseFloat(input[ 0 ]) / parseFloat(input[ 1 ])).toFixed(dec);
}

function backProcess() {
    if(display.value.length < 1) return;
    display.value = display.value.substring(0, display.value.length-1);

    if(input[ 1 ].length > 0) {
        input[ 1 ] = input[ 1 ].substring(0, input[ 1 ].length - 1);
        if( input[ 1 ].length == 0 || input[ 1 ] == ".") isValidInput[ 1 ] = false;
    } else if (operator != 0) { 
        operator = 0;
    } else if (input[ 0 ].length > 0) {
        input[ 0 ] = input[ 0 ].substring(0, input[ 0 ].length - 1);
        if( input[ 0 ].length == 0 || input[ 0 ] == ".") isValidInput[ 0 ] = false;        
    }
}

Array.from(numpad).forEach(function(element) {
    element.addEventListener('click', () => {
        // addDigitToCurrentNumber(parseInt(element.value));
        addDigitToCurrentNumber(element.value);
        element.blur();
}, false)});

function addDigitToCurrentNumber(digit) {
    // input[ currentNumber ] = input[ currentNumber ] * 10 + digit;
    input[ currentNumber ] = input[ currentNumber ].concat(digit);
    isValidInput[ currentNumber ] = true;
    display.value = display.value.concat(digit);
}

function addDecimalPoint() {
    // if(isDecimalPointAdded[ currentNumber] == true) return;
    // isDecimalPointAdded[ currentNumber ] = true;
    if(input[ currentNumber ].includes(".")) return;
    input[ currentNumber ] = input[ currentNumber ].concat(".");
    display.value = display.value.concat(".");
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
        // result = process();
        // resultVal.value = result;
        // input[ 0 ] = result.toString();
        // isDecimalPointAdded[ 0 ] = input[ 0 ].includes(".");
        // input[ 1 ] = "";
        // isDecimalPointAdded[ 1 ] = false;
        // isValidInput[1] = false;
        // display.value = result.toString();
        // currentNumber = 1;
        // operator = setOperator(operator_str);
        // display.value = display.value.concat(operator_str);

        processEqual();
        display.value = display.value.concat(operator_str);
        currentNumber = 1;
        operator = setOperator(operator_str);
    }
}

document.getElementById("btn_eq").addEventListener("click", () => {
    processEqual();
});

document.getElementById("btn_decibal").addEventListener("click", () => {
    addDecimalPoint();
});

document.getElementById("btn_bk").addEventListener("click", () => {
    backProcess();
});

document.getElementById("btn_CE").addEventListener("click", () => {
    //TODO
});

document.getElementById("btn_pm").addEventListener("click", () => {
    //TODO
});

function processEqual() {
    if(isValidInput[0]==true && isValidInput[1]==true) {
        result = mathjs.eval(display.value);
       // result = process();
        resultVal.value = result;
        input[ 0 ] = result.toString();
        // isDecimalPointAdded[ 0 ] = input[ 0 ].includes(".");
        input[ 1 ] = "";
        // isDecimalPointAdded[ 1 ] = false;
        isValidInput[ 1 ] = false;
        display.value = result.toString();
        currentNumber = 0;
        operator = 0;
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
    } else if(e.key == ".") {
        addDecimalPoint();
    } else if(e.keyCode == 8 || e.keyCode == 46 ) {
        backProcess();
    }
});

document.getElementById("btn_C").addEventListener("click", () => {
    reset();
    document.activeElement.blur();
});
