import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./materia.component').then(m => m.MateriaComponent),
    data: {
      title: `Materia`
    }
  },
];
