const Calculator = {
  display: document.querySelector('.calculator__display'),
  keys: document.querySelector('.calculator__buttons'),

  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,

  init() {
    Calculator.keys.addEventListener('click', (event) => {
      const { target } = event;
      const { value } = target;

      if(!target.matches('button')) return
      
      switch(value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
          Calculator.handleOperator(value);
          break;
        
        case '.':
          Calculator.inputDecimal(value);
          break;
        
        case 'all-clear':
          Calculator.resetCalculator();
          break;
        
        default:
          if(Number.isInteger(parseFloat(value))) {
            Calculator.inputDigit(value);
          }
      }

      Calculator.updateDisplay();
    });

    Calculator.updateDisplay();
  },

  updateDisplay() {
    Calculator.display.value = Calculator.displayValue;
  },

  inputDigit(digit) {
    const { displayValue } = Calculator;

    if(Calculator.waitingForSecondOperand) {
      Calculator.displayValue = digit;
      Calculator.waitingForSecondOperand = false;
    } else {
      Calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;      
    }

  },

  inputDecimal(dot) {
    if(!Calculator.displayValue.includes('.')) {
      Calculator.displayValue += dot;
    }
  },

  handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = Calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && Calculator.waitingForSecondOperand) {
      Calculator.operator = nextOperator;
      return
    }

    if(firstOperand === null && !isNaN(inputValue)) {
      Calculator.firstOperand = inputValue;

    } else if(operator) {
      const result = Calculator.calculate(firstOperand, inputValue, operator);

      Calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      Calculator.firstOperand = result;
    }

    Calculator.waitingForSecondOperand = true;
    Calculator.operator = nextOperator;
  },

  calculate(firstOperand, secondOperand, operator) {
    switch(operator) {
      case '+': return firstOperand + secondOperand;
      case '-': return firstOperand - secondOperand;
      case '*': return firstOperand * secondOperand;
      case '/': return firstOperand / secondOperand;
    }

    return secondOperand
  },

  resetCalculator() {
    Calculator.displayValue = '0';
    Calculator.firstOperand = null;
    Calculator.waitingForSecondOperand = false;
    Calculator.operator = null;
  }
}

Calculator.init();