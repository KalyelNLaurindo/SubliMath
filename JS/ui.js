import { CustomStorageManager } from './storage.js'; // Importando do storage.js
import { Calculator } from './calculator.js';

class CalculatorUI {
  constructor() {
    console.log('Inicializando CalculatorUI...');
    this.calculator = new Calculator();
    this.customStorageManager = new CustomStorageManager();
    this.currentExpression = '';
    this.history = this.customStorageManager.loadHistory();
    console.log('Histórico carregado:', this.history);
    this.initializeUI();
  }

  initializeUI() {
    console.log('Inicializando UI...');
    this.display = document.getElementById('display');
    this.degRadButton = document.getElementById('toggleDegRad');

    if (!this.display) {
      console.error('Elemento display não encontrado!');
      return; // Interrompe a inicialização se o display não existir
    }

    if (!this.degRadButton) {
      console.warn('Botão de grau/radiano não encontrado. Modo fixo.');
    }

    this.bindEvents();
  }

  bindEvents() {
    console.log('Vinculando eventos...');
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
    document.addEventListener('DOMContentLoaded', this.onDOMReady.bind(this));
    this.degRadButton.addEventListener('click', () => this.toggleDegrees());
  }

  handleKeyPress(event) {
    console.log('Tecla pressionada:', event.key);
    const key = event.key === ',' ? '.' : event.key; // Substitui vírgula por ponto

    const keyHandlers = {
      numeric: (key) => !isNaN(key) || '+-*/().'.includes(key),
      Enter: () => this.calculateResult(),
      Backspace: () => this.backspace(),
      Escape: () => this.clearDisplay()
    };

    if (keyHandlers.numeric(key)) {
      console.log('Adicionando ao display:', key);
      this.appendToDisplay(key);
    } else {
      if (keyHandlers[key]) {
        console.log('Executando ação para tecla:', key);
        keyHandlers[key]();
      } else {
        console.warn('Tecla não mapeada:', key);
      }
    }
  }

  updateDisplay(value) {
    console.log('Atualizando display com valor:', value);
    this.display.value = value;
    return this;
  }

  updateExpressionAndDisplay(newExpression) {
    console.log('Atualizando expressão e display com:', newExpression);
    this.currentExpression = newExpression;
    this.updateDisplay(this.currentExpression);
  }

  clearDisplay() {
    console.log('Limpando display...');
    return this.updateExpressionAndDisplay('');
  }

  backspace() {
    console.log('Removendo último caractere do display...');
    const newExpression = this.currentExpression.slice(0, -1);
    return this.updateExpressionAndDisplay(newExpression);
  }

  appendToDisplay(value) {
    console.log('Adicionando ao display:', value);
    const sanitizedValue = value.replace(/,/g, '.'); // Substitui vírgula por ponto
    const expressionBuilder = new ExpressionBuilder(this.currentExpression);
    const newExpression = expressionBuilder
      .append(sanitizedValue === 'Ans' ? (this.display.value || '0') : sanitizedValue)
      .build();

    return this.updateExpressionAndDisplay(newExpression);
  }

  calculateResult() {
    console.log('Calculando resultado para:', this.currentExpression);
    try {
      const parser = new ExpressionParser(this.calculator.getAngleMode());
      const result = this.calculator.evaluateExpression(this.currentExpression);
      console.log('Resultado calculado:', result);
      this.updateDisplayAndHistory(result);
      return true;
    } catch (error) {
      console.error('Erro ao calcular resultado:', error.message);
      return this.handleCalculationError(error);
    }
  }

  updateDisplayAndHistory(result) {
    console.log('Atualizando display e histórico com resultado:', result);
    this.currentExpression = result.toString();
    this.updateDisplay(result);
    this.saveToHistory(`${this.currentExpression} = ${result}`);
  }

  saveToHistory(entry) {
    console.log('Salvando no histórico:', entry);
    this.history.push(entry);
    this.customStorageManager.saveHistory(this.history);
  }

  handleCalculationError(error) {
    console.error('Erro de cálculo:', error.message);

    if (error.message.includes('Parênteses')) {
      this.updateDisplay('Erro: Parênteses desbalanceados');
    } else if (error.message.includes('funções mal formadas')) {
      this.updateDisplay('Erro: Função mal formada');
    } else if (error.message.includes('not finite') || error.message.includes('Infinity')) {
      this.updateDisplay('Erro: Valor inválido');
    } else if (error.message.includes('divisão por zero')) {
      this.updateDisplay('Erro: Divisão por zero');
    } else {
      this.updateDisplay('Erro');
    }
    return false;
  }

  toggleDegrees() {
    console.log('Alternando entre graus e radianos...');
    this.calculator.toggleDegrees();
    const currentMode = this.calculator.getAngleMode();
    this.degRadButton.innerText = currentMode === 'DEG' ? 'Deg' : 'Rad';
    console.log('Modo atual:', currentMode === 'DEG' ? 'Graus' : 'Radianos');
  }

  onDOMReady() {
    console.log('DOM carregado. Inicializando referências globais...');
    window.calculatorUI = {
      appendToDisplay: this.appendToDisplay.bind(this),
      clearDisplay: this.clearDisplay.bind(this),
      backspace: this.backspace.bind(this),
      calculateResult: this.calculateResult.bind(this),
      toggleDegrees: this.toggleDegrees.bind(this)
    };

    // Atualizar o parser com o modo atual
    const currentMode = this.calculator.getAngleMode();
    const parser = new ExpressionParser(currentMode);
    console.log('Parser inicializado no modo:', currentMode);
  }
}

class ExpressionBuilder {
  constructor(initialExpression = '') {
    this.expression = initialExpression;
  }

  append(value) {
    console.log('Construindo expressão. Adicionando:', value);
    this.expression += value;
    return this;
  }

  build() {
    console.log('Expressão finalizada:', this.expression);
    return this.expression;
  }
}

window.onload = () => {
  new CalculatorUI();
};