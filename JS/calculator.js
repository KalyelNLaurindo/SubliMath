// Interface para operações matemáticas
const IMathOperations = {
  calculate: function(expression) {}
};

// Interface para conversões de ângulo
const IAngleConverter = {
  toRadians: function(angle) {},
  toDegrees: function(angle) {}
};

const DEBUG = true;
const WARN = true;
const ERROR = true;

function logDebug(message) {
    if (DEBUG) console.log(message);
}

function logWarn(message) {
    if (WARN) console.warn(message);
}

function logError(message) {
    if (ERROR) console.error(message);
}

class AngleConverter {
  toRadians(angle) {
    logDebug(`[AngleConverter] Convertendo ${angle} graus para radianos.`);
    const radians = (angle * Math.PI) / 180;
    logDebug(`[AngleConverter] Resultado: ${radians} radianos.`);
    return radians;
  }
  
  toDegrees(angle) {
    logDebug(`[AngleConverter] Convertendo ${angle} radianos para graus.`);
    const degrees = (angle * 180) / Math.PI;
    logDebug(`[AngleConverter] Resultado: ${degrees} graus.`);
    return degrees;
  }
}

class ExpressionParser {
  constructor(angleMode = 'RAD') {
    this.angleMode = angleMode;
  }

  parse(expression) {
    console.log(`[ExpressionParser] Iniciando parsing da expressão: "${expression}"`);
    const sanitized = this.sanitizeExpression(expression);
    console.log(`[ExpressionParser] Expressão sanitizada: "${sanitized}"`);
    const replaced = this.replaceSymbols(sanitized);
    console.log(`[ExpressionParser] Expressão com símbolos substituídos: "${replaced}"`);
    return replaced;
  }

  sanitizeExpression(expr) {
    return expr.trim().replace(/\s+/g, '');
  }

  replaceSymbols(expr) {
    let expression = expr.replace(/√/g, 'Math.sqrt')
                         .replace(/\^/g, '**')
                         .replace(/π/g, 'Math.PI');

    if (this.angleMode === 'DEG') {
      expression = expression.replace(/sin\(/g, 'Math.sin((Math.PI/180)*')
                             .replace(/cos\(/g, 'Math.cos((Math.PI/180)*')
                             .replace(/tan\(/g, 'Math.tan((Math.PI/180)*');
    } else {
      expression = expression.replace(/sin\(/g, 'Math.sin(')
                             .replace(/cos\(/g, 'Math.cos(')
                             .replace(/tan\(/g, 'Math.tan(');
    }

    return expression;
  }
}

class CalculatorValidator {
  static validate(result) {
    logDebug(`[CalculatorValidator] Validando resultado: ${result}`);
    if (!isFinite(result)) {
      logError(`[CalculatorValidator] Resultado inválido: não é finito.`);
      throw new CalculatorError('Invalid result: not finite');
    }
    logDebug(`[CalculatorValidator] Resultado válido.`);
  }
}

class CalculatorError extends Error {
  constructor(message) {
    super(`[Calculator Error] ${message}`);
    logError(`[CalculatorError] ${message}`);
  }
}

class Calculator {
  constructor() {
    this.angleMode = 'RAD'; // Padrão: Radianos
    console.log('[Calculator] Instância criada com modo de ângulo padrão: RAD');
  }

  toggleDegrees() {
    this.angleMode = this.angleMode === 'RAD' ? 'DEG' : 'RAD';
    console.log(`[Calculator] Modo de ângulo alterado para: ${this.angleMode}`);
  }

  getAngleMode() {
    return this.angleMode;
  }

  calculate(expression) {
    console.log(`[Calculator] Iniciando cálculo para a expressão: "${expression}"`);
    try {
      const parser = new ExpressionParser(this.angleMode);
      const parsedExpression = parser.parse(expression);
      console.log(`[Calculator] Expressão parseada: "${parsedExpression}"`);
      const result = this.evaluateExpression(parsedExpression);
      console.log(`[Calculator] Resultado calculado: ${result}`);
      return result;
    } catch (error) {
      console.error(`[Calculator] Erro ao calcular: ${error.message}`);
      throw error;
    }
  }

  evaluateExpression(expression) {
    try {
      const result = Function('"use strict"; return (' + expression + ')')();
      if (!isFinite(result)) {
        throw new CalculatorError('Resultado inválido: infinito');
      }
      if (isNaN(result)) {
        throw new CalculatorError('Resultado inválido: não é um número');
      }
      return result;
    } catch (error) {
      throw new CalculatorError('Erro ao avaliar expressão: ' + error.message);      
    }
  }
}

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
    calculator.toggleDegrees();
    console.assert(Math.abs(calculator.calculate('sin(90)') - 1) < 0.0000001, 'Sine in degrees failed');
    calculator.toggleDegrees();
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
    calculator.toggleDegrees();
    console.assert(Math.abs(calculator.calculate('sin(90)') - 0.8939966636) < 0.0000001, 'Sine of 90 radians failed');

    // sin(π/2) no modo DEG
    calculator.toggleDegrees();
    console.assert(Math.abs(calculator.calculate('sin(π/2)') - 1) < 0.0000001, 'Sine of π/2 degrees failed');

    // Teste adicional para Math.log(0)
    try {
      calculator.calculate('Math.log(0)');
      console.assert(false, 'Math.log(0) test failed');
    } catch (error) {
      console.assert(error instanceof CalculatorError, 'Math.log(0) did not throw CalculatorError');
    }

    logDebug('[CalculatorTestSuite] Testes de casos de borda concluídos.');
  }
}

class CalculatorFactory {
  static create(config) {
    logDebug('[CalculatorFactory] Criando nova instância de Calculator.');
    return new Calculator();
  }
}

const calculatorState = {
  subscribe: function(callback) {
    logDebug('[calculatorState] Callback de inscrição registrado.');
  }
};

document.getElementById('display').addEventListener('input', function (event) {
    const input = event.target.value;

    try {
        const sanitizedInput = input.replace(/[^0-9+\-*/().πe√^%]/g, '');
        if (sanitizedInput !== input) {
            logWarn('[Input Validator] Entrada contém caracteres inválidos. Foi sanitizada.');
            event.target.value = sanitizedInput;
        }

        const parser = new ExpressionParser('RAD');
        parser.parse(sanitizedInput);
    } catch (error) {
        logError('[Input Validator] Entrada inválida:', error.message);
        event.target.value = '';
    }
});

CalculatorTestSuite.testBasicOperations();
CalculatorTestSuite.testTrigonometricOperations();
CalculatorTestSuite.testEdgeCases();

window.Calculator = Calculator;

// Exportar as classes e funções necessárias
export { Calculator, CalculatorError, logDebug, logWarn, logError,  };
