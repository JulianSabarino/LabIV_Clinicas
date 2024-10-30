import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-adminregister',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './adminregister.component.html',
  styleUrl: './adminregister.component.scss'
})
export class AdminregisterComponent {

  utilsService = inject(UtilsService);
  authService = inject(AuthService);
  spinner = inject(NgxSpinnerService);

  form = new FormGroup({
    mail: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    document: new FormControl('',[Validators.required]),
    age: new FormControl(''),
    password: new FormControl('',[Validators.required]),
  })

  async register()
  {
    this.spinner.show();
    if(this.form.valid)
    {

      let user: any = 
      {
        mail:this.form.value.mail as string,
        name: this.form.value.name as string,
        surename: this.form.value.surname as string,
        age: this.form.value.age as string,
        dni: this.form.value.document as string,
        admin: false,
        info: [],
        image:["",""]
      }

      try
      {
        await this.authService.createNewAdmin(user,this.form.value.password as string);
        this.utilsService.goto("home/mainh");
      }
      catch
      {
        console.log("Error al crear usuario")
      }

    }
    else
    {
      console.log("error en el form")
    }

    this.spinner.hide();
  }

}
