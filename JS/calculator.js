/******************************************************
 * calculator.js
 * Responsável por toda a lógica de cálculo, incluindo:
 * - Avaliação de expressões
 * - Ajuste de radianos/graus
 * - Fatorial e outras funções matemáticas
 * - Testes simples de validação
 ******************************************************/

class Calculator {
    constructor() {
      this.isDegrees = true; // Por padrão inicia em graus
    }
  
    /**
     * Altera o modo entre graus e radianos.
     */
    toggleDegrees() {
      this.isDegrees = !this.isDegrees;
      console.log(`[Calculator] Modo alterado para: ${this.isDegrees ? 'Graus' : 'Radianos'}`);
    }
  
    /**
     * Avalia a expressão recebida em string e retorna o resultado.
     * Aplica substituições para funções matemáticas e trigonométricas.
     * @param {string} expression
     * @returns {number} resultado
     */
    evaluateExpression(expression) {
      try {
        // Substitui símbolos e funções
        let parsedExpression = this._parseExpression(expression);
  
        // Avalia a expressão com eval
        let result = eval(parsedExpression);
  
        // Verifica se é finito
        if (!isFinite(result)) {
          console.error('[Calculator] Erro: Divisão por zero ou resultado não finito.');
          throw new Error('Divisão por zero ou resultado não finito');
        }
  
        // Limita casas decimais
        return parseFloat(result.toFixed(10));
  
      } catch (err) {
        console.error(`[Calculator] Erro ao avaliar expressão: ${err.message}`);
        throw new Error('Erro de avaliação');
      }
    }
  
    /**
     * Função de fatorial (n!)
     * @param {number} n
     * @returns {number}
     */
    factorial(n) {
      if (n < 0) return NaN;
      if (n === 0 || n === 1) return 1;
  
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      return result;
    }
  
    /**
     * Testes básicos de TDD para validar o comportamento do Calculator.
     * Em um cenário real, você poderia usar Jest/Mocha/etc.
     */
    static runTests() {
      const calculator = new Calculator();
  
      // Teste 1: Soma simples
      const test1 = calculator.evaluateExpression('2+3');
      console.assert(test1 === 5, 'Teste 1 Falhou: 2+3 deve ser 5.');
  
      // Teste 2: Fatorial
      const test2 = calculator.factorial(5);
      console.assert(test2 === 120, 'Teste 2 Falhou: fatorial(5) deve ser 120.');
  
      // Teste 3: Modo graus vs radianos
      calculator.toggleDegrees(); // Agora está em radianos
      const test3 = calculator.evaluateExpression('sin(3.1415926535)'); // ~ sin(pi) = 0 em rad
      console.assert(Math.abs(test3) < 0.000001, 'Teste 3 Falhou: sin(pi) em rad deve ser aproximadamente 0.');
  
      // Teste 4: Fatorial com substituição (5!)
      const test4 = calculator.evaluateExpression('5!');
      console.assert(test4 === 120, 'Teste 4 Falhou: 5! deve ser 120.');
  
      // Teste 5: Erro proposital
      try {
        calculator.evaluateExpression('1/0');
        console.assert(false, 'Teste 5 Falhou: 1/0 deveria gerar erro.');
      } catch (error) {
        console.assert(true, 'Teste 5 Passou: 1/0 gerou erro corretamente.');
      }
  
      console.log('[Calculator] Todos os testes foram executados.');
    }
  
    /**
     * Substitui símbolos especiais e funções na expressão.
     * @param {string} expr
     * @returns {string} expr substituída
     */
    _parseExpression(expr) {
      // Substituição de símbolos
      let expression = expr.replace(/√/g, 'Math.sqrt');
      expression = expression.replace(/\^/g, '**');
      expression = expression.replace(/log\(/g, 'Math.log10(');
      expression = expression.replace(/ln\(/g, 'Math.log(');
      expression = expression.replace(/π/g, 'Math.PI');
      expression = expression.replace(/(?<!Math\.)e(?![a-zA-Z0-9])/g, 'Math.E'); // evita conflitar com 'exp'
      expression = expression.replace(/EXP/g, 'Math.exp');
  
      // Trigonometria
      if (this.isDegrees) {
        expression = expression.replace(/sin\(/g, 'Math.sin(Math.PI / 180 * ');
        expression = expression.replace(/cos\(/g, 'Math.cos(Math.PI / 180 * ');
        expression = expression.replace(/tan\(/g, 'Math.tan(Math.PI / 180 * ');
      } else {
        // Em radianos, substitui direto
        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');
        expression = expression.replace(/tan\(/g, 'Math.tan(');
      }
  
      // Inverso trigonométrico
      expression = expression.replace(/asin\(/g, 'Math.asin(');
      expression = expression.replace(/acos\(/g, 'Math.acos(');
      expression = expression.replace(/atan\(/g, 'Math.atan(');
  
      // Fatorial
      if (expression.includes('!')) {
        expression = expression.replace(/(\d+)!/g, (match, num) => this.factorial(parseInt(num)));
      }
  
      return expression;
    }
  }
  
  // Exporta a classe para uso em outros arquivos
  window.Calculator = Calculator;
  
  // Descomente para executar os testes no carregamento
  // Calculator.runTests();
  