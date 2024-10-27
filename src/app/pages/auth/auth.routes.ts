import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../auth/auth.component').then(m=>m.AuthComponent)
    },
    {
        path: 'register',
        loadComponent: ()=> import('../auth/register/register.component').then(m=>m.RegisterComponent)
    }
];
