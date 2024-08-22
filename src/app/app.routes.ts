import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [


      {
        path: 'marca',
        loadChildren: () => import('./views/marca/routes').then((m) => m.routes),

      },
      {
        path: 'vehiculo',
        loadChildren: () => import('./views/vehiculo/routes').then((m) => m.routes)
      },

      {
        path: 'inventario',
        loadChildren: () => import('./views/inventario/routes').then((m) => m.routes)
      },

      {
        path: 'materia',
        loadChildren: () => import('./views/materia/routes').then((m) => m.routes)
      },

      {
        path: 'persona',
        loadChildren: () => import('./views/persona/routes').then((m) => m.routes)
      },

      //NO TOCAR MAPA
    ]
  },


  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },

  // {
  //   path: 'prestamo',
  //   loadComponent: () => import('./views/prestamo/prestamo.component').then(m => m.PrestamoComponent), // Añadir esta línea
  //   data: {
  //     title: 'Prestamo'
  //   }
  // },

];
