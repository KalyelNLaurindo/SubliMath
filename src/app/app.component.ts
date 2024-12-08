import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Marcando como standalone
  imports: [RouterOutlet], // Importando funcionalidades necessárias
  templateUrl: './app.component.html', // HTML do componente
  styleUrls: ['./app.component.css'], // CSS do componente
})
export class AppComponent {
  title = 'SupremaCalculadora';
}
