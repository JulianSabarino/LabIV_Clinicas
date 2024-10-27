import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  router = inject(Router)

  goto(path : string){
    this.router.navigate([path]);
  }
}
