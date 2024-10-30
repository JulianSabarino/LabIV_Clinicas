import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const utilsService = inject(UtilsService);

return new Promise((resolve)=>{
  
    if(authService.loggedUser.mail){
      resolve(true)
      console.log("guarded");
    }else{
      utilsService.goto('home');
      resolve(false)
    }
  })
};
