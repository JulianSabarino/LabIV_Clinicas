import { Component, inject } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user/user.model';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  countryList!: any[];
  utilsService = inject(UtilsService);
  authService = inject(AuthService);
  spinner = inject(NgxSpinnerService);


  selectedCountry: string | null = null;
  

  form = new FormGroup({
    mail: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    document: new FormControl('',[Validators.required]),
    age: new FormControl('',this.ageMinValidator(18)),
    password: new FormControl('',[Validators.required]),
    obraSocial: new FormControl('',[Validators.required])
  })


  ageMinValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < minAge) {
        return { ageMin: true };
      }
      return null;
    };
  }

  async register()
  {
    this.spinner.show();
    if(this.form.valid)
    {
      let user: User = 
      {
        mail:this.form.value.mail as string,
        name: this.form.value.name as string,
        surename: this.form.value.surname as string,
        age: this.form.value.age as string,
        dni: this.form.value.document as string,
        medic: false,
        admin: false,
        info: [this.form.value.obraSocial],
        image:["",""]
      }
      //console.log(user);

      try
      {
        await this.authService.createNewUser(user,this.form.value.password as string);
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

  async saveImage(event: any)
  {
    const file = event.target.files[0];
    if (file) {
      let savedPhoto = await this.authService.savePhoto(file,"userPhotos");
      
      console.log(savedPhoto);
      //this.imagen = file
  }
}

  
}
