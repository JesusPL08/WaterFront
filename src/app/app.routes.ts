import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
  path: 'configuracion',
  loadComponent: () => import('./pages/configuracion/configuracion.page').then(m => m.ConfiguracionPage)
  },
  {
  path: 'Usuarios',
  loadComponent: () => import('./pages/Usuarios/usuarios.page').then(m => m.UsuariosPage)
  },
  {
  path: 'Perfiles',
  loadComponent: () => import('./pages/Perfiles/perfiles.page').then(m => m.PerfilesPage)
  }
];
