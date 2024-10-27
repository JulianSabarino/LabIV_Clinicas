import { Component, inject } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  authFirebase = inject(AuthService)
  utilSvc = inject(UtilsService)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  async submit() {
/*
    await this.authFirebase.login(this.form.value.email!, this.form.value.password!, () => {
      this.utilSvc.goto(this.pathExito)
     
    })


    //const res = this.localStorage.login(this.formLogin.value)?"usuario logeado":"no se encontro el usuario"*/
  }

  accesoRapido(email: string, password: string) {
    this.form.patchValue({
      email: email,
      password: password
    });
  }
}
