import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { rightLeftAnimation } from '../../animations/rightleft.animation';



@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  animations: [
    rightLeftAnimation
  ]
})
export class AuthComponent implements OnInit{
  authService = inject(AuthService)
  utilSvc = inject(UtilsService)
  
  spinner = inject(NgxSpinnerService);

  loading:boolean = true;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

 async ngOnInit() {
    this.spinner.show()
    await this.authService.getUserList();
    this.spinner.hide();
  }

  async submit() {
    this.spinner.show();
    try
    {
      await this.authService.logIn(this.form.value.email!, this.form.value.password!) 
      this.utilSvc.goto("home/mainh");
    }
    catch
    {
      console.log("credenciales incorrectas");
    }
     
    this.spinner.hide();
    //const res = this.localStorage.login(this.formLogin.value)?"usuario logeado":"no se encontro el usuario"*/
  }

  accesoRapido(email: string, password: string) {

    this.form.patchValue({
      email: email,
      password: password
    });
  }
}
