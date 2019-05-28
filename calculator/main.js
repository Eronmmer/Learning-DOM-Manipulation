let clearBtn = document.querySelector('.clear-btn');
let deleteBtn = document.querySelector('.del-btn');
let decimalBtn = document.querySelector('.dec-btn');
let display = document.querySelector('.input');

let numbers = document.querySelectorAll('.num-btn');
let operators = document.querySelectorAll('.opr-btn');

let displayValue = '0';
let pendingValue;
let evalStringArray =[];

for(let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', showStuff);
}

for(let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', performOperation);
}

function showStuff(e) {
  let btnText = e.target.innerText;

  if(displayValue === '0') {
    displayValue = '';
  }

  displayValue += btnText;
  display.innerText = displayValue;
}

function performOperation(e) {
  let operator = e.target.innerText;
  switch (operator) {
    case '+':
      pendingValue = displayValue;
      displayValue = '0'
      display.innerText = displayValue;
      evalStringArray.push(pendingValue);
      evalStringArray.push('+');
      break;
    case 'X':
      pendingValue = displayValue;
      displayValue = '0'
      display.innerText = displayValue;
      evalStringArray.push(pendingValue);
      evalStringArray.push('*');
      break;
    case '-':
      pendingValue = displayValue;
      displayValue = '0'
      display.innerText = displayValue;
      evalStringArray.push(pendingValue);
      evalStringArray.push('-');
      break;
    case '÷':
      pendingValue = displayValue;
      displayValue = '0'
      display.innerText = displayValue;
      evalStringArray.push(pendingValue);
      evalStringArray.push('/');
      break;
    case '=':
      evalStringArray.push(displayValue);
      console.log(eval(evalStringArray));
      let evaluation = eval(evalStringArray.join(''));
      console.log(evaluation);
			displayValue = evaluation + '';
			display.innerText = displayValue;
			evalStringArray = [];
			break;
  }
}

deleteBtn.addEventListener('click', function() {
  let displayLength = displayValue.length;
  displayValue = displayValue.slice('0', displayLength - 1);

  if(displayValue === '') {
    displayValue = '0'
  }

  display.innerText = displayValue;
})

clearBtn.addEventListener('click', function() {
  displayValue = '0'
  evalStringArray = [];
  display.innerHTML = displayValue;
})

decimalBtn.addEventListener('click', function() {
  if(!displayValue.includes('.')) {
    displayValue += '.';
  }

  display.innerText = displayValue;
})
