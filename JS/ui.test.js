describe('CalculatorUI', () => {
  let calculatorUI;

  beforeEach(() => {
    calculatorUI = new CalculatorUI();
  });

  test('appendToDisplay adds value correctly', () => {
    calculatorUI.appendToDisplay('5');
    expect(calculatorUI.currentExpression).toBe('5');
  });

  test('clearDisplay resets expression', () => {
    calculatorUI.appendToDisplay('5');
    calculatorUI.clearDisplay();
    expect(calculatorUI.currentExpression).toBe('');
  });
});
