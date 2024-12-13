import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Rotas configuradas

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Configura as rotas
  ],
}).catch((err) => console.error(err));
