/******************************************************
 * ui.js
 * Responsável pela manipulação do DOM, captura de eventos,
 * exibição do resultado e integração com Calculator e Storage.
 ******************************************************/

document.addEventListener('DOMContentLoaded', () => {
    // Instâncias das classes
    const calculator = new Calculator();
    const storageManager = new StorageManager();
  
    // Obtem elementos
    const display = document.getElementById('display');
    const toggleDegRadBtn = document.getElementById('toggleDegRad');
  
    // Carrega histórico (se precisar exibir em algum local futuramente)
    let history = storageManager.loadHistory();
  
    // Variável para armazenar expressão atual
    let currentExpression = '';
  
    /**
     * Atualiza o conteúdo do display.
     * @param {string} value
     */
    function updateDisplay(value) {
      display.value = value;
    }
  
    /**
     * Adiciona valor ao display e à expressão atual.
     * @param {string} value
     */
    function appendToDisplay(value) {
      Logger.info(`Adicionando valor ao display: ${value}`);
      
      if (value === 'Ans') {
        // 'Ans' se refere ao último valor do display
        currentExpression += display.value || '0';
      } else {
        currentExpression += value;
      }
      updateDisplay(currentExpression);
    }
  
    /**
     * Limpa o display e a expressão.
     */
    function clearDisplay() {
      Logger.info('Limpando display...');
      currentExpression = '';
      updateDisplay('');
    }
  
    /**
     * Apaga o último caractere da expressão.
     */
    function backspace() {
      Logger.info('Backspace acionado.');
      currentExpression = currentExpression.slice(0, -1);
      updateDisplay(currentExpression);
    }
  
    /**
     * Calcula o resultado da expressão atual.
     */
    function calculateResult() {
      Logger.info(`Calculando expressão: ${currentExpression}`);
      try {
        const result = calculator.evaluateExpression(currentExpression);
        updateDisplay(result);
        currentExpression = result.toString();
  
        // Salva no histórico
        history.push(`${currentExpression} = ${result}`);
        storageManager.saveHistory(history);
  
      } catch (error) {
        Logger.error(`Erro no cálculo: ${error.message}`);
        updateDisplay('Erro');
      }
    }
  
    /**
     * Alterna entre graus e radianos.
     */
    function toggleDegrees() {
      calculator.toggleDegrees();
      toggleDegRadBtn.innerText = calculator.isDegrees ? 'Deg' : 'Rad';
    }
  
    /**
     * Trata eventos de teclado.
     */
    document.addEventListener('keydown', (event) => {
      const key = event.key;
  
      // Digitos numéricos e operadores básicos
      if (!isNaN(key) || '+-*/().'.includes(key)) {
        appendToDisplay(key);
      } else if (key === 'Enter') {
        // Enter -> calcula
        calculateResult();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === 'Escape') {
        clearDisplay();
      }
    });
  
    // Expondo as funções no escopo global (caso sejam chamadas diretamente via HTML)
    window.appendToDisplay = appendToDisplay;
    window.clearDisplay = clearDisplay;
    window.backspace = backspace;
    window.calculateResult = calculateResult;
    window.toggleDegrees = toggleDegrees;
  });
  