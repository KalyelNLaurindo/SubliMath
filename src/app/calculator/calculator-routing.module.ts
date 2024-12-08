import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component'; // Importe o componente

const routes: Routes = [
  { path: '', component: CalculatorComponent }, // Rota padrão do módulo
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculatorRoutingModule {}
