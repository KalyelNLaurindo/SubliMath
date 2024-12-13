import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redireciona para a rota padrão (calculadora)
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },

  // Rota para autenticação
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // Rota para calculadora
  {
    path: 'calculator',
    loadChildren: () =>
      import('./calculator/calculator.module').then((m) => m.CalculatorModule),
  },

  // Rota para conversão de moedas
  {
    path: 'currency',
    loadChildren: () =>
      import('./currency/currency.module').then((m) => m.CurrencyModule),
  },

  // Rota para histórico
  {
    path: 'history',
    loadChildren: () =>
      import('./history/history.module').then((m) => m.HistoryModule),
  },

  // Rota para conversão de unidades
  {
    path: 'unit-conversion',
    loadChildren: () =>
      import('./unit-conversion/unit-conversion.module').then(
        (m) => m.UnitConversionModule
      ),
  },

  // Redireciona para a calculadora caso a rota seja inválida
  { path: '**', redirectTo: 'calculator' },
];
