class CalculatorUI {
  constructor() {
    this.calculator = new Calculator();
    this.customStorageManager = new CustomStorageManager();
    this.currentExpression = '';
    this.history = this.customStorageManager.loadHistory();
    this.initializeUI();
  }

  initializeUI() {
    this.display = document.getElementById('display');
    this.degRadButton = document.getElementById('toggleDegRad');
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
    document.addEventListener('DOMContentLoaded', this.onDOMReady.bind(this));
  }

  handleKeyPress(event) {
    const keyHandlers = {
      numeric: (key) => !isNaN(key) || '+-*/().'.includes(key),
      Enter: () => this.calculateResult(),
      Backspace: () => this.backspace(),
      Escape: () => this.clearDisplay()
    };

    if (keyHandlers.numeric(event.key)) {
      this.appendToDisplay(event.key);
    } else {
      keyHandlers[event.key]?.();
    }
  }

  updateDisplay(value) {
    this.display.value = value;
    return this;
  }

  appendToDisplay(value) {
    const expressionBuilder = new ExpressionBuilder(this.currentExpression);
    this.currentExpression = expressionBuilder
      .append(value === 'Ans' ? (this.display.value || '0') : value)
      .build();
      
    return this.updateDisplay(this.currentExpression);
  }

  clearDisplay() {
    this.currentExpression = '';
    return this.updateDisplay('');
  }

  backspace() {
    this.currentExpression = this.currentExpression.slice(0, -1);
    return this.updateDisplay(this.currentExpression);
  }

  calculateResult() {
    try {
      const result = this.calculator.evaluateExpression(this.currentExpression);
      this.updateDisplayAndHistory(result);
      return true;
    } catch (error) {
      return this.handleCalculationError(error);
    }
  }

  updateDisplayAndHistory(result) {
    this.currentExpression = result.toString();
    this.updateDisplay(result);
    this.saveToHistory(`${this.currentExpression} = ${result}`);
  }

  saveToHistory(entry) {
    this.history.push(entry);
    this.customStorageManager.saveHistory(this.history);
  }

  handleCalculationError(error) {
    Logger.error(`Calculation Error: ${error.message}`);
    this.updateDisplay('Error');
    return false;
  }

  toggleDegrees() {
    this.calculator.toggleDegrees();
    this.degRadButton.innerText = this.calculator.isDegrees ? 'Deg' : 'Rad';
  }

  onDOMReady() {
    window.calculatorUI = {
      appendToDisplay: this.appendToDisplay.bind(this),
      clearDisplay: this.clearDisplay.bind(this),
      backspace: this.backspace.bind(this),
      calculateResult: this.calculateResult.bind(this),
      toggleDegrees: this.toggleDegrees.bind(this)
    };
  }
}

class ExpressionBuilder {
  constructor(initialExpression = '') {
    this.expression = initialExpression;
  }

  append(value) {
    this.expression += value;
    return this;
  }

  build() {
    return this.expression;
  }
}

const calculator = new CalculatorUI();