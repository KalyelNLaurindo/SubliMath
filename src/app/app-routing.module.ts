import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'calculator', // Caminho da calculadora
    loadChildren: () =>
      import('./calculator/calculator.module').then((m) => m.CalculatorModule),
  },
  { path: '', redirectTo: 'calculator', pathMatch: 'full' }, // Redireciona para a calculadora por padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Define rotas principais
  exports: [RouterModule],
})
export class AppRoutingModule {}
