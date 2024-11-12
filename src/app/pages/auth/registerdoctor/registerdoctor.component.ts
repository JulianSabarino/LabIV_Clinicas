import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UtilsService } from '../../../services/utils.service';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../../models/user/user.model';
import { EspecialidadesService } from '../../../services/especialidades.service';

@Component({
  selector: 'app-registerdoctor',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './registerdoctor.component.html',
  styleUrl: './registerdoctor.component.scss'
})
export class RegisterdoctorComponent implements OnInit{
  countryList!: any[];
  utilsService = inject(UtilsService);
  authService = inject(AuthService);
  specialityService = inject(EspecialidadesService);
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
    mail: new FormControl('',[Validators.required,Validators.email]),
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    document: new FormControl('',[Validators.required]),
    age: new FormControl('',this.ageMinValidator(18)),
    password: new FormControl('',[Validators.required]),
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

  async ngOnInit() {
    this.spinner.show();
    await this.specialityService.getEspecialidadesList();
    this.spinner.hide();
  }

  async register()
  {
    this.spinner.show();
    if(this.form.valid)
    {
      let infoUser;
      infoUser = this.especialidades;
      
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


  addRemoveSpeciality(especialidad: any) {
    
    if(especialidad.isChecked) especialidad.isChecked=false;
    else especialidad.isChecked=true;

    console.log(this.especialidades);
  }

  async nuevaEspecialidad(event: any)
  {
    if (event.key === 'Enter') {
      this.spinner.show();
      // Obtener el valor del input
      const inputValue = (event.target as HTMLInputElement).value;
      await this.specialityService.newEspecialidad(inputValue);
      await this.specialityService.getEspecialidadesList();
      console.log(inputValue);
      (event.target as HTMLInputElement).value = "";
      this.spinner.hide();
    }
  }

}
