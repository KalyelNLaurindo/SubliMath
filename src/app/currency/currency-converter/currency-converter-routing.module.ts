import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter.component'; // Substitua pelo componente correto

const routes: Routes = [
  { path: '', component: CurrencyConverterComponent }, // Defina a rota padrão
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyConverterRoutingModule {} // Certifique-se de exportar o nome correto aqui
