import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Marcando o componente como standalone
  imports: [RouterOutlet], // Importando o RouterOutlet para renderizar rotas
  templateUrl: './app.component.html', // HTML do componente
  styleUrls: ['./app.component.css'], // CSS do componente
})
export class AppComponent {
  title = 'SupremaCalculadora'; // Título da aplicação
}
