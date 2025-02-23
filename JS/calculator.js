// Interface for mathematical operations
const IMathOperations = {
  calculate: function(expression) {}
};

// Interface for angle conversions
const IAngleConverter = {
  toRadians: function(angle) {},
  toDegrees: function(angle) {}
};

class AngleConverter {
  toRadians(angle) {
    return (angle * Math.PI) / 180;
  }
  
  toDegrees(angle) {
    return (angle * 180) / Math.PI;
  }
}

class ExpressionParser {
  static MATH_SYMBOLS = {
    SQRT: '√',
    PI: 'π',
    EXP: 'EXP'
  };

  parse(expression) {
    return this.replaceSymbols(this.sanitizeExpression(expression));
  }

  sanitizeExpression(expr) {
    return expr.trim().replace(/\s+/g, '');
  }

  replaceSymbols(expr) {
    let expression = expr.replace(/√/g, 'Math.sqrt');
    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/log\(/g, 'Math.log10(');
    expression = expression.replace(/ln\(/g, 'Math.log(');
    expression = expression.replace(/π/g, 'Math.PI');
    expression = expression.replace(/(?<!Math\.)e(?![a-zA-Z0-9])/g, 'Math.E');
    expression = expression.replace(/EXP/g, 'Math.exp');
    return expression;
  }
}

class CalculatorValidator {
  static validate(result) {
    if (!isFinite(result)) {
      throw new CalculatorError('Invalid result: not finite');
    }
  }
}

class CalculatorError extends Error {
  constructor(message) {
    super(`[Calculator Error] ${message}`);
  }
}

class Calculator {
  constructor() {
    this.parser = new ExpressionParser();
    this.angleConverter = new AngleConverter();
    this.angleMode = 'DEG';
  }

  calculate(expression) {
    try {
      const parsedExpression = this.parser.parse(expression);
      const result = this.evaluateExpression(parsedExpression);
      CalculatorValidator.validate(result);
      return this.formatResult(result);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  setAngleMode(mode) {
    this.angleMode = mode;
  }

  formatResult(value) {
    return Number(value.toFixed(10));
  }

  handleError(error) {
    console.error(`Calculator operation failed: ${error.message}`);
  }
}

class CalculatorTestSuite {
  static testBasicOperations() {
    const calculator = new Calculator();
    console.assert(calculator.calculate('2+2') === 4, 'Basic addition failed');
    console.assert(calculator.calculate('10-5') === 5, 'Basic subtraction failed');
    console.assert(calculator.calculate('4*3') === 12, 'Basic multiplication failed');
    console.assert(calculator.calculate('15/3') === 5, 'Basic division failed');
  }

  static testTrigonometricOperations() {
    const calculator = new Calculator();
    calculator.setAngleMode('DEG');
    console.assert(Math.abs(calculator.calculate('sin(90)') - 1) < 0.0000001, 'Sine in degrees failed');
    calculator.setAngleMode('RAD');
    console.assert(Math.abs(calculator.calculate('sin(π/2)') - 1) < 0.0000001, 'Sine in radians failed');
  }
}

class CalculatorFactory {
  static create(config) {
    return new Calculator();
  }
}

const calculatorState = {
  subscribe: function(callback) {}
};

window.Calculator = Calculator;
