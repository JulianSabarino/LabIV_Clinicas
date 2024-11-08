import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { TurndategeneratorComponent } from '../../../components/turndategenerator/turndategenerator.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserinfoPipe } from '../../../pipes/userinfo.pipe';
import { user } from '@angular/fire/auth';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { ScheduleService } from '../../../services/schedule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-turnasker',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule,TurndategeneratorComponent,ReactiveFormsModule,UserinfoPipe],
  templateUrl: './turnasker.component.html',
  styleUrl: './turnasker.component.scss'
})
export class TurnaskerComponent implements OnInit{

  authService = inject(AuthService);
  especialitiesService = inject(EspecialidadesService);
  scheduleService = inject(ScheduleService);
  spinner = inject(NgxSpinnerService);
  toastSvc = inject(ToastrService);

  hours: number[] = [];
  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  currentWeekDays: Date[] = [];
  selectedMedic: any | null;
  selectedPatient: any | null;
  selectedSpeciality?: string
  selectedTurn:any


  medicList: any[] = [];
  userList: any[] = [];

  form = new FormGroup({
    date: new FormControl(''),
  })

  async ngOnInit() {
    this.spinner.show();

    await this.authService.getUserList();
    await this.especialitiesService.getEspecialidadesList();
    await this.scheduleService.getTurns();

    console.log(this.scheduleService.turnList);

    this.authService.userList.forEach(user => {
      //console.log(user.userInfo.info);
      if(!user.userInfo.medic)
        this.userList?.push(user);
    });
    
    this.currentWeekDays = this.getWeekDays();
    this.spinner.hide();
  }

  getWeekDays(): Date[] {
    const today = new Date();
    const currentDay = today.getDay(); // Día de la semana (0: Domingo, 6: Sábado)
    const weekDays: Date[] = [];

    // Itera sobre los días de la semana, comenzando desde el Lunes
    for (let i = 1; i <= 6; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + (i - currentDay));
      weekDays.push(day);
    }

    return weekDays;
  }
  
  getWeekDaysByDay(date:Date): Date[] {
    const today = date;
    const currentDay = today.getDay(); // Día de la semana (0: Domingo, 6: Sábado)
    const weekDays: Date[] = [];

    // Itera sobre los días de la semana, comenzando desde el Lunes
    for (let i = 1; i <= 6; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + (i - currentDay));
      weekDays.push(day);
    }

    return weekDays;
  }

  selectDate()
  {
    let date = new Date(this.form.value.date as string);
    this.currentWeekDays =  this.getWeekDaysByDay(date);

    console.log(this.currentWeekDays);
  }

  
  isValidHour(hour: string, day: Date): boolean {
    // Valida si el horario es válido para el día
    let findedTurn = false;
    this.scheduleService.turnList.forEach(turn => {

      if(turn.doctor == this.selectedMedic.userInfo.mail && turn.date == this.formatDateToStringWithDash(day) && turn.turn == hour)
      {
        findedTurn = true;
      }
    });

    if(findedTurn)
    {
      return false;
    }else
    {
      if (day.getDay() == 6) {
        return this.scheduleService.satTurns.includes(hour);
      } else {
        return this.scheduleService.baseTurns.includes(hour);
      }
    }
  }
  
  selectSpeciality(especialidad:string)
  {
    this.selectedSpeciality = especialidad;
    this.selectedMedic = null;
    this.selectedTurn=null;

    this.medicList = [];
    this.authService.userList.forEach(user => {
      //console.log(user.userInfo.info);
      if(user.userInfo.medic && user.userInfo.info.includes(especialidad))
        this.medicList?.push(user);
    });
  }

  selectMedic(medic: any)
  {
    this.selectedMedic = medic;
    this.selectedTurn=null;
    console.log(this.selectedMedic.userInfo.mail);
    console.log(this.authService.userProfile?.mail);
  }

  selectTurn(hour: string, day:Date)
  {
    this.selectedTurn = 
    {
      hour: hour,
      day: this.formatDateToStringWithDash(day)
    }
    //this.scheduleService.generateTurnByDateAndName(this.formatDateToString(day),this.selectedMedic.userInfo.mail,hour); Esto es para crear el turno
    console.log(hour+day);
  }

  async generateTurn()
  {
    let date = new Date(this.selectedTurn.day);
     await this.scheduleService.generateTurnByDateAndName(this.formatDateToString(date),this.selectedMedic.userInfo.mail,this.selectedTurn.hour);
    //this.toastSvc.info("Faltan campos por seleccionar","Seleccionar Campos")
    console.log("generado el turno");
  }

  formatDateToString(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}${month}${year}`;
  }
  
  formatDateToStringWithDash(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  selectPatient(patient: any)
  {
    this.selectedPatient = patient;
    console.log(this.selectedPatient.userInfo.mail);
  }

}
