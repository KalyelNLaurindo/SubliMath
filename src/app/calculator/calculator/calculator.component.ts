import { Component } from '@angular/core';
// Importa math.js para cálculos mais seguros (opcional)
import { evaluate } from 'mathjs';

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
        this.appendOperator(button.label);
        break;
      case this.ButtonType.Clear:
        this.clearLastEntry();
        break;
      case this.ButtonType.Equals:
        this.evaluateExpression();
        break;
    }
  }

  /**
   * Adiciona números ou outros valores ao display
   * @param value Valor a ser adicionado
   */
  private appendToDisplay(value: string): void {
    this.display += value;
  }

  /**
   * Adiciona operadores, verificando se o último caractere já é um operador
   * @param operator Operador a ser adicionado
   */
  private appendOperator(operator: string): void {
    if (/[+\-×÷]$/.test(this.display.trim())) {
      return; // Evita operadores consecutivos
    }
    this.display += ` ${operator} `;
  }

  /**
   * Remove o último caractere inserido ou limpa o display se estiver vazio
   */
  private clearLastEntry(): void {
    if (this.display.length > 0) {
      this.display = this.display.slice(0, -1).trim();
    } else {
      this.display = '';
    }
  }

  /**
   * Avalia a expressão atual no display
   */
  private evaluateExpression(): void {
    try {
      if (!this.display.trim()) {
        this.display = 'Erro'; // Evita avaliação com entrada vazia
        return;
      }

      // Substitui operadores visuais por operadores válidos no JavaScript
      const sanitizedExpression = this.display
        .replace(/÷/g, '/')
        .replace(/×/g, '*');

      // Usa math.js para avaliar a expressão de forma segura
      const result = evaluate(sanitizedExpression);

      this.display = result.toString(); // Converte o resultado para string
    } catch (error) {
      this.display = 'Erro'; // Mostra mensagem de erro em caso de falha
    }
  }
}
