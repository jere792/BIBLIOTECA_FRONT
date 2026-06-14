import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { ListaLibros } from './components/lista-libros/lista-libros';
import { CrearCuenta } from './components/crear-cuenta/crear-cuenta';
import { CrearEmpleado } from './components/crear-empleado/crear-empleado';
import { CrearLibro } from './components/crear-libro/crear-libro';
import { GestionarEmpleados } from './components/gestionar-empleados/gestionar-empleados';
import { GestionLibros } from './components/gestion-libros/gestion-libros';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: '', component: Login, canActivate: [guestGuard] },
  { path: 'crear-cuenta', component: CrearCuenta },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'libros', component: ListaLibros, canActivate: [authGuard] },
  { path: 'crear-empleado', component: CrearEmpleado, canActivate: [authGuard] },
  { path: 'crear-libro', component: CrearLibro, canActivate: [authGuard] },
  { path: 'gestionar-empleados', component: GestionarEmpleados, canActivate: [authGuard] },
  { path: 'gestion-libros', component: GestionLibros, canActivate: [authGuard] }
];
