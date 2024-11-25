import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('../adminturns/adminturns.component').then(m=>m.AdminturnsComponent)
    },
    {
        path: 'graphics',
        loadComponent: ()=> import('../adminturns/graphics/graphics.component').then(m=>m.GraphicsComponent)
    }
];
