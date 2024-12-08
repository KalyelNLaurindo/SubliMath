import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  display: string = ''; // Armazena a entrada do usuário e o resultado

  // Enum para tipos de botão, melhorando legibilidade e manutenção
  ButtonType = {
    Number: 'Number',
    Operator: 'Operator',
    Clear: 'Clear',
    Equals: 'Equals'
  };

  // Dados dos botões organizados em um array para fácil manipulação
  buttons: { label: string, type: string }[] = [
    { label: '7', type: this.ButtonType.Number },
    { label: '8', type: this.ButtonType.Number },
    { label: '9', type: this.ButtonType.Number },
    { label: '÷', type: this.ButtonType.Operator },
    { label: '4', type: this.ButtonType.Number },
    { label: '5', type: this.ButtonType.Number },
    { label: '6', type: this.ButtonType.Number },
    { label: '×', type: this.ButtonType.Operator },
    { label: '1', type: this.ButtonType.Number },
    { label: '2', type: this.ButtonType.Number },
    { label: '3', type: this.ButtonType.Number },
    { label: '-', type: this.ButtonType.Operator },
    { label: 'C', type: this.ButtonType.Clear },
    { label: '0', type: this.ButtonType.Number },
    { label: '=', type: this.ButtonType.Equals },
    { label: '+', type: this.ButtonType.Operator }
  ];

  /**
   * Manipula os cliques nos botões com base no tipo do botão
   * @param button Dados do botão clicado
   */
  onButtonClick(button: { label: string, type: string }): void {
    switch (button.type) {
      case this.ButtonType.Number:
        this.appendToDisplay(button.label);
        break;
      case this.ButtonType.Operator:
        this.appendToDisplay(` ${button.label} `); // Adiciona espaços ao redor dos operadores
        break;
      case this.ButtonType.Clear:
        this.clearDisplay();
        break;
      case this.ButtonType.Equals:
        this.evaluateExpression();
        break;
    }
  }

  /**
   * Adiciona valores à tela
   * @param value Valor a ser adicionado
   */
  private appendToDisplay(value: string): void {
    this.display += value;
  }

  /**
   * Limpa a tela
   */
  private clearDisplay(): void {
    this.display = '';
  }

  /**
   * Avalia a expressão na tela
   */
  private evaluateExpression(): void {
    try {
      // Substitui operadores visuais por operadores válidos no JavaScript
      const sanitizedExpression = this.display
        .replace(/÷/g, '/')
        .replace(/×/g, '*');

      // Calcula a expressão de forma segura (substitua `eval` por outra biblioteca se possível)
      const result = Function(`"use strict"; return (${sanitizedExpression})`)();
      this.display = result.toString();
    } catch (error) {
      this.display = 'Erro'; // Mostra mensagem de erro em caso de cálculo inválido
    }
  }
}
