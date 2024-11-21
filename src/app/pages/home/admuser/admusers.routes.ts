import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../admuser/admuser.component').then(m=>m.AdmuserComponent)
    },
    {
        path: 'usercard',
        loadComponent: ()=> import('../admuser/usercards/usercards.component').then(m=>m.UsercardsComponent)
    }
];
