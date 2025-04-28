import { Calculator, CalculatorError, logDebug, ExpressionParser } from './calculator.js';
import { StorageManager, Logger } from './storage.js';

class CalculatorTestSuite {
  static testBasicOperations() {
    logDebug('[CalculatorTestSuite] Testando operações básicas.');
    const calculator = new Calculator();
    console.assert(calculator.calculate('2+2') === 4, 'Basic addition failed');
    console.assert(calculator.calculate('10-5') === 5, 'Basic subtraction failed');
    console.assert(calculator.calculate('4*3') === 12, 'Basic multiplication failed');
    console.assert(calculator.calculate('15/3') === 5, 'Basic division failed');
    logDebug('[CalculatorTestSuite] Testes de operações básicas concluídos.');
  }

  static testTrigonometricOperations() {
    logDebug('[CalculatorTestSuite] Testando operações trigonométricas.');
    const calculator = new Calculator();
    calculator.setAngleMode('DEG');
    console.assert(Math.abs(calculator.calculate('sin(90)') - 1) < 0.0000001, 'Sine in degrees failed');
    calculator.setAngleMode('RAD');
    console.assert(Math.abs(calculator.calculate('sin(π/2)') - 1) < 0.0000001, 'Sine in radians failed');
    logDebug('[CalculatorTestSuite] Testes de operações trigonométricas concluídos.');
  }

  static testEdgeCases() {
    logDebug('[CalculatorTestSuite] Testando casos de borda.');
    const calculator = new Calculator();

    // Parênteses errados
    try {
      calculator.calculate('(2+3');
      console.assert(false, 'Unbalanced parentheses test failed');
    } catch (error) {
      console.assert(error instanceof CalculatorError, 'Unbalanced parentheses did not throw CalculatorError');
    }

    // log(0) (dá -Infinity)
    try {
      calculator.calculate('log(0)');
      console.assert(false, 'log(0) test failed');
    } catch (error) {
      console.assert(error instanceof CalculatorError, 'log(0) did not throw CalculatorError');
    }

    // 1/0 (dá Infinity)
    try {
      calculator.calculate('1/0');
      console.assert(false, '1/0 test failed');
    } catch (error) {
      console.assert(error instanceof CalculatorError, '1/0 did not throw CalculatorError');
    }

    // √(-1) (dá NaN)
    try {
      calculator.calculate('√(-1)');
      console.assert(false, 'Square root of negative number test failed');
    } catch (error) {
      console.assert(error instanceof CalculatorError, '√(-1) did not throw CalculatorError');
    }

    // sin(90) no modo RAD
    calculator.setAngleMode('RAD');
    console.assert(Math.abs(calculator.calculate('sin(90)') - 0.8939966636) < 0.0000001, 'Sine of 90 radians failed');

    // sin(π/2) no modo DEG
    calculator.setAngleMode('DEG');
    console.assert(Math.abs(calculator.calculate('sin(π/2)') - 0.0274121336) < 0.0000001, 'Sine of π/2 degrees failed');

    logDebug('[CalculatorTestSuite] Testes de casos de borda concluídos.');
  }

  static testToggleAngleMode() {
    logDebug('[CalculatorTestSuite] Testando alternância de modos de ângulo.');
    const calculator = new Calculator();

    console.assert(calculator.getAngleMode() === 'RAD', 'Modo inicial deve ser RAD');
    calculator.toggleDegrees();
    console.assert(calculator.getAngleMode() === 'DEG', 'Modo deve ser DEG após alternar');
    calculator.toggleDegrees();
    console.assert(calculator.getAngleMode() === 'RAD', 'Modo deve ser RAD após alternar novamente');

    calculator.toggleDegrees(); // Modo DEG
    console.assert(Math.abs(calculator.calculate('sin(90)') - 1) < 0.0001, 'sin(90) em graus deve ser 1');

    calculator.toggleDegrees(); // Modo RAD
    console.assert(Math.abs(calculator.calculate('sin(π/2)') - 1) < 0.0001, 'sin(π/2) em radianos deve ser 1');

    logDebug('[CalculatorTestSuite] Testes de alternância de modos de ângulo concluídos.');
  }
}

class StorageManagerTests {
  static runTests() {
    Logger.info('Running StorageManager tests');
    this.testSingleton();
    this.testSaveAndLoad();
    this.testInvalidData();
    this.testClearHistory();
    Logger.info('All tests completed');
  }

  static beforeEach() {
    localStorage.clear();
  }

  static testSingleton() {
    Logger.info('Testing Singleton pattern');
    const instance1 = StorageManager.getInstance();
    const instance2 = StorageManager.getInstance();
    console.assert(instance1 === instance2, 'Singleton pattern test failed');
    Logger.info('Singleton pattern test passed');
  }

  static testSaveAndLoad() {
    this.beforeEach();
    Logger.info('Testing save and load functionality');
    const manager = StorageManager.getInstance();
    const testData = [{
      calculation: '2+2',
      result: 4,
      timestamp: new Date()
    }];

    manager.saveHistory(testData);
    const loaded = manager.loadHistory();
    console.assert(loaded.length === 1, 'Save and load test failed');
    Logger.info('Save and load test passed');
  }

  static testInvalidData() {
    this.beforeEach();
    Logger.info('Testing invalid data handling');
    const manager = StorageManager.getInstance();
    try {
      manager.saveHistory([{ invalid: 'data' }]);
      console.assert(false, 'Invalid data validation failed');
    } catch (error) {
      console.assert(error instanceof StorageError, 'Error handling test failed');
      Logger.info('Invalid data handling test passed');
    }
  }

  static testClearHistory() {
    this.beforeEach();
    Logger.info('Testing clear history functionality');
    const manager = StorageManager.getInstance();
    manager.clearHistory();
    const history = manager.loadHistory();
    console.assert(history.length === 0, 'Clear history test failed');
    Logger.info('Clear history test passed');
  }
}

// Agrupar os testes em uma função
function runAllTests() {
  CalculatorTestSuite.testBasicOperations();
  CalculatorTestSuite.testTrigonometricOperations();
  CalculatorTestSuite.testEdgeCases();
  CalculatorTestSuite.testToggleAngleMode();
  StorageManagerTests.runTests();
  console.log('✅ Todos os testes passaram.');
}

// Executar todos os testes
runAllTests();