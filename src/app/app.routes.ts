import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, //ana sayfa logine yönlendirmesi için
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard },
    { path: '**', redirectTo: '/login' }
];
