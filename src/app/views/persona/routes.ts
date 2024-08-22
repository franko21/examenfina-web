import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./persona.component').then(m => m.PersonaComponent),
    data: {
      title: `Persona`
    }
  },
];
