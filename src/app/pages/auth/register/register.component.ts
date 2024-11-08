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
  
  isMedic: boolean = false;

  especialidades:any[] = 
  [
    {
      name: "Veterinario",
      isChecked: false
    },
    {
      name: "Clinico",
      isChecked: false
    },
    {
      name: "Osteospatia",
      isChecked: false
    },
    {
      name: "Psicologia",
      isChecked: false
    },
  ]

  form = new FormGroup({
    mail: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    document: new FormControl('',[Validators.required]),
    age: new FormControl('',this.ageMinValidator(18)),
    password: new FormControl('',[Validators.required]),
    obraSocial: new FormControl('',this.obraSocialValidator())
  })

  obraSocialValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      console.log(control)
      if (!this.isMedic && !control.value) {
        return { required: true }; // Return an error if obraSocial is not filled and isMedic is false
      }

      return null; // Return null if the input is valid
    };
  }

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
      let infoUser;
      if(this.isMedic)
        infoUser = this.especialidades;
      else
        infoUser = [this.form.value.obraSocial];

      let user: User = 
      {
        mail:this.form.value.mail as string,
        name: this.form.value.name as string,
        surename: this.form.value.surname as string,
        age: this.form.value.age as string,
        dni: this.form.value.document as string,
        medic: this.isMedic,
        admin: false,
        info: infoUser,
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

  checkMedic()
  {
    this.isMedic = !this.isMedic;
    console.log(this.isMedic)
  }


  addRemoveSpeciality(especialidad: any) {
    
    if(especialidad.isChecked) especialidad.isChecked=false;
    else especialidad.isChecked=true;

    console.log(this.especialidades);
  }

  
}
