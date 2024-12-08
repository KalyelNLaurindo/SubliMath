import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' }, // Redireciona para a rota padrão
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, // Rota para autenticação
  { path: 'calculator', loadChildren: () => import('./calculator/calculator.module').then(m => m.CalculatorModule) }, // Rota para calculadora
  { path: 'currency', loadChildren: () => import('./currency/currency.module').then(m => m.CurrencyModule) }, // Rota para conversão de moedas
  { path: 'history', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) }, // Rota para histórico
  { path: 'unit-conversion', loadChildren: () => import('./unit-conversion/unit-conversion.module').then(m => m.UnitConversionModule) }, // Rota para conversão de unidades
  { path: '**', redirectTo: 'calculator' } // Redireciona para calculadora caso a rota seja inválida
];
