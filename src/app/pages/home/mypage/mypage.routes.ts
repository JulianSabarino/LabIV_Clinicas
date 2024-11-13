import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../mypage/mypage.component').then(m=>m.MypageComponent)
    },
    {
        path: 'medic',
        loadComponent: ()=> import('../mypage/medic/medic.component').then(m=>m.MedicComponent)
    }
];
