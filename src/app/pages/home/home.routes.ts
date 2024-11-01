import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../home/home.component').then(m=>m.HomeComponent)
    },
    {
        path: 'admuser',
        loadComponent: ()=> import('../home/admuser/admuser.component').then(m=>m.AdmuserComponent)
    },
    {
        path: 'mainh',
        loadComponent: ()=> import('../home/mainh/mainh.component').then(m=>m.MainhComponent)
    }
];
