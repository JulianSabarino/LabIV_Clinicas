import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../myturns/myturns.component').then(m=>m.MyturnsComponent)
    },
    {
        path: 'medics',
        loadComponent: ()=> import('../myturns/medics/medics.component').then(m=>m.MedicsComponent)
    }
];
