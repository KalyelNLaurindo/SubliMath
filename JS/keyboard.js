document.addEventListener('keydown', (event) => {
  const key = event.key === ',' ? '.' : event.key;

  // Tratamento especial para Backspace e Escape
  if (key === 'Backspace') {
    calculatorUI.backspace(); // Apaga o último caractere
    return;
  }
  if (key === 'Escape') {
    calculatorUI.clearDisplay(); // Limpa tudo
    return;
  }

  // Mapeamento de teclas para os botões
  const keyMap = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '.': '.',
    '(': '(',
    ')': ')',
    '%': '%',
    '^': '^',
    'Enter': '=', // Enter para calcular
    '=': '='      // Tecla igual
  };

  // Verifica se a tecla pressionada está mapeada
  if (keyMap[key]) {
    const button = document.querySelector(`button[onclick^="appendToDisplay('${keyMap[key]}')"]`) ||
                   document.querySelector(`button[onclick^="calculateResult()"]`);

    if (button) {
      button.click(); // Simula o clique no botão correspondente
    }
  }
});