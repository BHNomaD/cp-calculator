
var mathjs = require("mathjs");

let display = document.querySelector("#display");
let resultVal = document.querySelector("#result");

let numpad = document.getElementsByClassName("numpad");
let opPad = document.getElementsByClassName("operator");
var currentNumber = "";

function reset() {
    display.value = "";
    resultVal.value = "";
    currentNumber = "";
}



function backProcess() {
    if(display.value.length < 1) return;
    display.value = display.value.substring(0, display.value.length-1);

}

Array.from(numpad).forEach(function(element) {
    element.addEventListener('click', () => {
        addDigitToCurrentNumber(element.value);
}, false)});

function addDigitToCurrentNumber(digit) {
    display.value = display.value.concat(digit);
    currentNumber = currentNumber.concat(digit);
    document.activeElement.blur();
}

function addDecimalPoint() {
    if(currentNumber.includes(".")) return;
    display.value = display.value.concat(".");
    currentNumber = currentNumber.concat(".");
}

Array.from(opPad).forEach(function(element) {
    element.addEventListener('click', () => {
        processOperator(element.value);
        element.blur();
}, false)});

function processOperator(operator_str) {
    if(currentNumber.length<1) return;
    display.value = display.value.concat(operator_str);
    currentNumber = "";
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
    if(display.value.length>0) {
        try{
            result = mathjs.eval(display.value);
            resultVal.value = result;
            display.value = result.toString();
        }catch(error) {
            console.log(error);
        }
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
