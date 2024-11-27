import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../home/home.component').then(m=>m.HomeComponent)
    },
    {
        path: 'admuser',
        loadChildren: ()=> import('../home/admuser/admusers.routes').then(m=>m.routes)
    },
    {
        path: 'mainh',
        loadComponent: ()=> import('../home/mainh/mainh.component').then(m=>m.MainhComponent)
    },
    {
        path: 'userturns',
        loadChildren: ()=> import('../home/userturns/userturn.routes').then(m=>m.routes)
    },
    {
        path: 'medicturns',
        loadChildren: ()=> import('../home/medicturns/medicturns.routes').then(m=>m.routes)
    },
    {
        path: 'adminturns',
        loadChildren: ()=> import('../home/adminturns/adminturns.routes').then(m=>m.routes)
    },
    {
        path: 'mypage',
        loadChildren: ()=> import('../home/mypage/mypage.routes').then(m=>m.routes)
    }
];
