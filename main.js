// 変数の宣言
const calcButtons = document.querySelector('.calc-buttons');
let number = '0';
let previousNumber = '0';
let symbol = null;
let screenText = '0';

//　計算用関数
function add() {
    number = parseFloat(number);
    previousNumber = parseFloat(previousNumber);
    let total = String(previousNumber + number);
    number = total;
    screenText = total;
}

function sub() {
    number = parseFloat(number);
    previousNumber = parseFloat(previousNumber);
    let total = String(previousNumber - number);
    number = total;
    screenText = total;
}

function multiply() {
    number = parseFloat(number);
    previousNumber = parseFloat(previousNumber);
    let total = String(previousNumber * number);
    number = total;
    screenText = total;
}

function divide() {
    number = parseFloat(number);
    previousNumber = parseFloat(previousNumber);
    let total = String(previousNumber / number);
    number = total;
    screenText = total;
}

//　ボタン(.calc-button)クリック時の関数。数字かどうかで分岐
function buttonClick(value) {
    if(isNaN(value)) {
        //　数字ではない(NaN)時の処理
        handleSymbol(value);    
    }else{
        //　数字の時の処理
        handleNumber(value);
    }
}

//　valueが数字ではない時の処理の関数
function handleSymbol(symbol) {
    switch(symbol) {
        // 'AC' の時の処理　→ 表示screenTextと内部計算用numberを0に
        case 'AC':
            number = '0';
            previousNumber = '0';
            symbol = null;
            screenText = '0';
            break;
        // '=' の時の処理　→ screenTextに含まれるsymbol種に応じて、計算用関数
        case '=':
            if(screenText.includes('+')) {
                add();
            } else if (screenText.includes('-')) {
                sub();
            } else if (screenText.includes('*')) {
                multiply();
            } else if (screenText.includes('/')) {
                divide();
            } else {
                ;
            }
            break;
        // '.'の時の処理　→ screenTextの末尾が +,-,*,/,. の時は、入力できないように
        case '.':
            if(screenText.substring(screenText.length - 1) == '+' || screenText.substring(screenText.length - 1) == '-' || screenText.substring(screenText.length - 1) == '*' || screenText.substring(screenText.length - 1) == '/' || screenText.substring(screenText.length - 1) == '.') {
                ;
            } else {
                number += symbol;
                screenText += symbol;
            }
            break;
        // 演算子の時の処理　→ screenTextに他の演算子を含むときは入力できないように
        case '+':
        case '-':
        case '*':
        case '/':
            if(screenText.includes('+') || screenText.includes('-') || screenText.includes('*') || screenText.includes('/')) {
                ;
            } else {
                previousNumber = number;
                number = '0';
                screenText += symbol;
            }
    }
    // .screenのテキストをscreenTextへ
    document.querySelector('.screen').innerText = screenText;
}

// valueが数字の時の処理
function handleNumber(value) {
    // screenTextが0の時　→ valueで表示を更新
    if(screenText == '0') {
        number = value;
        screenText = value;
    // それ以外 → valueを末尾に追加
    } else {
        number += value;
        screenText += value;
    }
    //　.screenのテキストを、screenTextへ
    document.querySelector('.screen').innerText = screenText;
}

//　.calc-buttonをクリックで発火
calcButtons.addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
});


