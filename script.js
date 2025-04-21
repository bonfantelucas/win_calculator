let n1 = 0;
let n2 = 0;
let result = 0;
let operator = '';
let operatorButtons = '';
let percentButton = '';
let percentClick = false;
let spanVisor = document.querySelector('.span-visor');

// NÚMEROS
document.addEventListener('DOMContentLoaded', () => {
    const numButtons = document.querySelectorAll('.calc-button.light.num');
    const visor = document.querySelector('.input-visor');

    numButtons.forEach(button => {
        button.addEventListener('click', () => {
            visor.value += button.textContent;
        });
    });
});

// BACKSPACE
document.addEventListener('DOMContentLoaded', () => {
    const operatorButtons = document.querySelectorAll('#backspace');
    const visor = document.querySelector('.input-visor');

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            visor.value = visor.value.slice(0, -1);
        });
    });
});

// CLEAR C
document.addEventListener('DOMContentLoaded', () => {
    const operatorButtons = document.querySelectorAll('#clear');
    const visor = document.querySelector('.input-visor');
    const spanVisor = document.querySelector('.span-visor');

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            visor.value = '';
            spanVisor.textContent = '';
            n1 = 0;
            n2 = 0;
            operator = '';
            percentClick = false;
        });
    });
});

// PERCENT
document.addEventListener('DOMContentLoaded', () => {
    percentButton = document.querySelector('#percent');
    const visor = document.querySelector('.input-visor');

    percentButton.addEventListener('click', () => {
        percentClick = true;
        if (n1 === 0) {
            n2 = 0;
            n2Value = parseFloat(n2);
            visor.value = n2Value;
        }
        else {
            n2 = visor.value;
            n2 = parseFloat(n2) / 100;
            visor.value = n2;
        }
    });
});

// COMPORTAMENTO PADRÃO OPERADORES
document.addEventListener('DOMContentLoaded', () => {
    operatorButtons = document.querySelectorAll('.operator');
    const visor = document.querySelector('.input-visor');

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (operator == '') { //SE EXISTIR UM OPERADOR
                n1 = visor.value.replace(',', '.');
                n1Value = parseFloat(n1);
                visor.value = '';
                spanVisor.textContent = n2;
                operator = button.innerText;
            }
            else {
                // visor.value = '';
                // spanVisor.textContent = '';
                // n1 = 0;
                // n2 = 0;
                // operator = '';
                n1 = result;
                n2 = visor.value.replace(',', '.');
                visor.value = '';
                spanVisor.textContent = n2;
                operator = button.innerText;
                percentClick = false;
            }
        });
    });
});

// IGUAL =
document.addEventListener('DOMContentLoaded', () => {
    const equalButton = document.querySelectorAll('#equal');
    const visor = document.querySelector('.input-visor');

    equalButton.forEach(button => {
        button.addEventListener('click', () => {

            //INÍCIO
            result = 0;

            if (n2 === 0) {
                n2 = visor.value.replace(',', '.');  // Substitui vírgula por ponto para decimal
            }

            else {
                n1 = visor.value.replace(',', '.');  // Substitui vírgula por ponto para decimal
            }

            n1Value = parseFloat(n1);
            n2Value = parseFloat(n2);

            //OPERADORES
            if (operator === '+') {
                if (percentClick == false) {
                    result = n1Value + n2Value;
                }
                else {
                    n2Value = n2Value * n1Value;
                    result = n1Value + n2Value;
                }
            }

            else if (operator === '-') {
                if (percentClick == false) {
                    result = n1Value - n2Value;
                }
                else {
                    n2Value = n2Value * n1Value;
                    result = n1Value - n2Value;
                }
            }

            else if (operator === 'x') {
                result = n1Value * n2Value;
            }

            else if (operator === '÷') {
                if (percentClick == false) {
                    result = n1Value / n2Value;
                }
                else {
                    n2Value = n2Value * n1Value;
                    result = n1Value / n2Value;
                }
            }

            else if (operator === 'x²') {
                if (percentClick == false) {
                    result = n1Value + n2Value;
                }
                else {
                    n2Value = n2Value * n1Value;
                    result = n1Value + n2Value;
                }
            }

            else if (operator === '²√x') {
                if (percentClick == false) {
                    result = n1Value + n2Value;
                }
                else {
                    n2Value = n2Value * n1Value;
                    result = n1Value + n2Value;
                }
            }

            //RESULTADO
            if (operator === '') {
                result = 0;
                spanVisor.textContent = 0 + '=';
            }
            else if (n1 == 0 || isNaN(n1)) {
                result = 0;
                spanVisor.textContent = 0 + '=';
            }
            else {
                spanVisor.textContent = n1Value + operator + n2Value + '=';
            }

            //EXIBIÇÃO DO RESULTADO E RESET DO PERCENT
            visor.value = result.toFixed(1).replace('.', ',');
            percentClick = false;
        });
    });
});


// Bloqueia caracteres não numéricos, exceto vírgula
const input = document.querySelector(".input-visor");

input.addEventListener("keypress", function (e) {
    if (!(e.key >= '0' && e.key <= '9') && e.key !== ',') {
        e.preventDefault();
    }

    if (e.key === ',' && input.value.includes(',')) {
        e.preventDefault(); // Bloqueia a segunda vírgula
    }
});
