
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
        input[ currentNumber ] = input[ currentNumber ] * 10 + parseInt(element.value);
        isValidInput[ currentNumber ] = true;
        display.value += element.value;
}, false)});

Array.from(opPad).forEach(function(element) {
    element.addEventListener('click', () => {

        if(isValidInput[0]==false) {
            //DO NOTHING
        } else if(isValidInput[0]==true && isValidInput[1]==false) {
            currentNumber = 1;
            operator = setOperator(element.value);
            display.value += element.value;
        } else if(isValidInput[0]==true && isValidInput[1]==true) {
            result = process();
            resultVal.value = result;
            input[ 0 ] = result;
            input[ 1 ] = 0;
            isValidInput[1] = false;
            operator = setOperator(element.value);
            currentNumber = 1;
            display.value = result.toString();
        }
}, false)});

document.getElementById("btn_eq").addEventListener("click", () => {
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
});

document.getElementById("btn_C").addEventListener("click", () => {
    reset();
});