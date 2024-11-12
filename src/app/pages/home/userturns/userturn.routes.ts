import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../userturns/userturns.component').then(m=>m.UserturnsComponent)
    },
    {
        path: 'myturns',
        loadComponent: ()=> import('../userturns/myturns/myturns.component').then(m=>m.MyturnsComponent)
    }
];
