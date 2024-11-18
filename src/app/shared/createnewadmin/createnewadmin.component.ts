import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-createnewadmin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './createnewadmin.component.html',
  styleUrl: './createnewadmin.component.scss'
})
export class CreatenewadminComponent {

  utilsService = inject(UtilsService);
  authService = inject(AuthService);
  spinner = inject(NgxSpinnerService);

  constructor(private dialogRef: MatDialogRef<CreatenewadminComponent>) {}

  form = new FormGroup({
    mail: new FormControl('',[Validators.required,Validators.email]),
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



  noCancelar(): void {
    this.dialogRef.close();  // Close without doing anything
  }

  // Handle "Cancelar" button click
  comment() {
    this.dialogRef.close();  // Return the cancellation comment
  }

  

}
