import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../auth/auth.component').then(m=>m.AuthComponent)
    },
    {
        path: 'register',
        loadComponent: ()=> import('../auth/register/register.component').then(m=>m.RegisterComponent)
    },
    {
        path: 'registerdoc',
        loadComponent: ()=> import('../auth/registerdoctor/registerdoctor.component').then(m=>m.RegisterdoctorComponent)
    }
    ,
    {
        path: 'registerselect',
        loadComponent: ()=> import('../auth/registerselect/registerselect.component').then(m=>m.RegisterselectComponent)
    }
];
