import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './calculator/calculator.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel

@NgModule({
  declarations: [CalculatorComponent], // Declaração do componente
  imports: [
    CommonModule,
    FormsModule, // Importa FormsModule
    CalculatorRoutingModule, // Importa o roteamento
  ],
})
export class CalculatorModule {}

