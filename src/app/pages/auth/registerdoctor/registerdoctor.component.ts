import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UtilsService } from '../../../services/utils.service';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../../models/user/user.model';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { Especialidades } from '../../../models/user/medicspeciality.model';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { RechaptchaService } from '../../../services/rechaptcha.service';
import { ToastrService } from 'ngx-toastr';
import { SupabaseService } from '../../../services/supabase.service';



@Component({
  selector: 'app-registerdoctor',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxSpinnerModule, RecaptchaModule,RecaptchaFormsModule],
  templateUrl: './registerdoctor.component.html',
  styleUrl: './registerdoctor.component.scss'
})
export class RegisterdoctorComponent implements OnInit{
  countryList!: any[];
  utilsService = inject(UtilsService);
  authService = inject(AuthService);
  specialityService = inject(EspecialidadesService);
  spinner = inject(NgxSpinnerService);
  captchaSvc = inject(RechaptchaService);
  claveWeb:string="";
  isCaptchaLoaded: boolean = false;
  toastr = inject(ToastrService);
  supaService = inject(SupabaseService)

  selectedCountry: string | null = null;
  
  isMedic: boolean = false;

  especialidades:Especialidades[] = []
  myPhoto?: File;

  form = new FormGroup({
    mail: new FormControl('',[Validators.required,Validators.email]),
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    document: new FormControl('',[Validators.required]),
    age: new FormControl('',this.ageMinValidator(18)),
    password: new FormControl('',[Validators.required]),
    recaptchaReactive:new FormControl('',Validators.required)
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
    this.claveWeb = this.captchaSvc.captchaGoogle.passwordWeb;
    console.log(this.claveWeb)
    this.isCaptchaLoaded = !!this.claveWeb;
    this.spinner.hide();
  }

  async register()
  {
    this.spinner.show();

    let savedPhoto = "";

    if (this.myPhoto) {
      savedPhoto = await this.supaService.uploadImage(this.myPhoto);
      
      console.log(savedPhoto);
  }

    if(this.form.valid)
    {
      let infoUser: any[] = [];
      this.especialidades.forEach(element => {
        infoUser.push(element.name);
      });
      
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
        image:[savedPhoto,""]
      }

      try
      {
        await this.authService.createNewMedic(user,this.form.value.password as string,this.especialidades);
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
    this.myPhoto = event.target.files[0];
    if(this.myPhoto?.type != 'image/jpeg')
    {
      this.toastr.error("Elija un archivo correcto");
      this.myPhoto = undefined;
    }
    else
    {
      this.toastr.success("Imagen seleccionada correctamente");
    }
  }

  addRemoveSpeciality(especialidad: any) {
    
    let esIndex = this.especialidades.findIndex(element => element.name == especialidad.name)

    if (esIndex > -1) {
      // If the turn exists, remove it
      this.especialidades.splice(esIndex, 1);
    } else {
      // If the turn does not exist, add it
      let temp: Especialidades = {
        name:especialidad.name,
        turns:[]
      }
      this.especialidades.push(temp);
    }

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

  resolved(captchaResponse: any) {
    console.log("entro"+captchaResponse);
  }
}
