import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: ()=> import('./pages/home/home.routes').then(m=>m.routes)
    },
    {
        path: 'auth',
        loadChildren: ()=> import('./pages/auth/auth.routes').then(m=>m.routes)
    }
];