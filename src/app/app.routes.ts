import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' }, // Redireciona para a calculadora como rota padrão
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, // Caminho correto para auth
  { path: 'auth/login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) }, // Login
  { path: 'calculator', loadChildren: () => import('./calculator/calculator.module').then(m => m.CalculatorModule) }, // Calculadora
  { path: 'currency', loadChildren: () => import('./currency/currency.module').then(m => m.CurrencyModule) }, // Conversor de moedas
  { path: 'currency/currency-converter', loadChildren: () => import('./currency/currency-converter/currency-converter.module').then(m => m.CurrencyConverterModule) }, // Conversor específico
  { path: 'history', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) }, // Histórico
  { path: 'unit-conversion', loadChildren: () => import('./unit-conversion/unit-conversion.module').then(m => m.UnitConversionModule) }, // Conversão de unidades
  { path: '**', redirectTo: 'calculator' }, // Redireciona para calculadora caso a rota seja inválida
];
