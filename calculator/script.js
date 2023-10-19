const massiveOfNumbers = ['0', '9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '+/-']
const massiveOfActions = ['/', 'X', '-', '+', '%']
let value1 = ''
let value2 = ''
let action = ''
let isFinish = false


let point = '.'
let sign = '+/-'
let res;
function reset() {
     value1 = ''
     value2 = ''
     action = ''
     isFinish = false
     input.textContent = '0'
     pointBtn.style.pointerEvents = 'auto'
     signBtn.style.pointerEvents = 'auto'
}

const pointBtn = document.querySelector('#point-btn')
const signBtn = document.querySelector('#sign-btn')

document.querySelector('#reset')
    .addEventListener('click', reset)


let input = document.querySelector('.result')
document.querySelector(".buttons__main-field").addEventListener('click',(e) => {
    if (!e.target.classList.contains('b')) return;
    let key = e.target.textContent // це кожного
    // first number
    if (massiveOfNumbers.includes(key)) {
        if (value2 === '' && action === '') {
            if (key === '0' && input.textContent === '0'){
                return;
            }
            if (key === point){
                value1 = input.textContent + point
                key = ''
            }
            else if(key === sign){
                if (input.textContent === '0' || input.textContent !== ''){
                    value1 = '-' + input.textContent
                }
                key = ''
            }
            else if(value1 === '-0'){
                value1 = ''
                value1 = '-' + value1
            }
             value1 += key
             input.textContent = value1
         }
        // second number
        else if(value1 !== '' && action !== ''){
            if (key === '0' && input.textContent === ''){
                return;
            }
            if (key === point && value2 === ''){
                value2 = '0' + point
                key = ''
            }
            else if(key === sign){
                if (massiveOfActions.includes(input.textContent)){
                    value2 = '-' + '0'
                }
                else if (input.textContent !== ''){
                    value2 = '-' + input.textContent
                }
                key = ''
            }
            else if(value2 === '-0'){
                value2 = ''
                value2 = '-' + value2
            }
            value2 += key
            input.textContent = value2
        }
    }
    // action
    if (massiveOfActions.includes(key)) {
        if (value1 !== '' && value2 === '') {
            action = key
            input.textContent = action
        }
    }
    // math actions
    if (key === '=') {
        if (value2 === '') value2 = value1
        const num1 = parseFloat(value1);
        const num2 = parseFloat(value2);

        switch (action) {
            case '%':
                res = num2 * (num1 / 100); // відсотки ділим на 100 і множимо на саме число
                break
            case '+':
                res = num1 + num2;
                break;
            case '-':
                res = num1 - num2;
                break;
            case 'X':
                res = num1 * num2;
                break;
            case '/':
                if (num2 === 0){
                    res = 'Помилка'
                }else{
                    res = num1 / num2;
                }
        }
        input.textContent = res;
        isFinish = true;
    }
    if(value1 !== '' && value2 !== '' && isFinish){
        value1 = res
    }

})

