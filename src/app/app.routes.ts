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
  path: 'Profile',
  loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
  path: 'Client',
  loadComponent: () => import('./pages/client/client.page').then(m => m.ClientPage)
  },
  {
  path: 'Branch',
  loadComponent: () => import('./pages/branch/branch.page').then(m => m.BranchPage)
  },
  {
  path: 'Salary',
  loadComponent: () => import('./pages/salary/salary.page').then(m => m.SalaryPage)
  },
  {
  path: 'Attendance-type',
  loadComponent: () => import('./pages/attendance-type/attendance-type.page').then(m => m.AttendanceTypePage)
  }

];
