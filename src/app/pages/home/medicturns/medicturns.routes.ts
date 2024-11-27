import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../medicturns/medicturns.component').then(m=>m.MedicturnsComponent)
    },
    {
        path: 'myusers',
        loadComponent: ()=> import('../medicturns/myusers/myusers.component').then(m=>m.MyusersComponent)
    }
];
