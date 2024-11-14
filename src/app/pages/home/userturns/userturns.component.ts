import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../../../services/auth.service';
import { user } from '@angular/fire/auth';
import { Especialidades } from '../../../models/user/medicspeciality.model';

@Component({
  selector: 'app-userturns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userturns.component.html',
  styleUrl: './userturns.component.scss',
  animations:
  [trigger('openClose', [
    state('open', style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'green'
    })),
  state('closed',style({
    height: '100px',
    opacity: 0.8,
    backgroundColor: 'red'
  })),
  transition('open => closed', [
    animate('2s ease-out')
  ],),
  transition('closed => open', [
    animate('10s')
  ]),
  ]),
],
})
export class UserturnsComponent implements OnInit{
  especialidadesSrv = inject(EspecialidadesService);
  authSrv = inject(AuthService);
  
  selectedSpeciality: any;
  selectedMedic:any;
  medicList: any[] = [];
  selectedEspecialidad?: Especialidades;
  formattedTurns: any[] = [
    {
      day: "",
      date: "",
      turn: ""
    }
  ]

  async ngOnInit() {
    await this.especialidadesSrv.getEspecialidadesList();
    await this.authSrv.getUserList();
    console.log(this.authSrv.userList);
  }

  selectEspecialidad(especialidad: any)
  {
    this.selectedSpeciality=especialidad;
    this.medicList=[];

    this.authSrv.userList.forEach(user => {
      if(user.userInfo.medic && user.userInfo.info.includes(especialidad.name))
        this.medicList?.push(user);  
    });

    console.log(this.medicList);
  }

  async selectDoctor(doctor: any)
  {
    this.selectedMedic=doctor;

    console.log(doctor);

    await this.especialidadesSrv.getLoggedEspecialidadesList(doctor.userInfo);

    console.log(this.especialidadesSrv.loggedEspecialities)

    this.selectedEspecialidad = this.especialidadesSrv.loggedEspecialities.find(speciality => speciality.name === this.selectedSpeciality.name)

    //console.log(this.selectedEspecialidad);
    this.generateTurnsForNextWeek();
  }

  generateTurnsForNextWeek() {
    const today = new Date();
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    
    // Generate a date range from today to one week ahead
    let dateRange = [];
    for (let i = 0; i < 7; i++) {
      let futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      dateRange.push(futureDate);
    }

    // Loop through each day of the input turns and map them to dates

    this.formattedTurns = [];

    this.selectedEspecialidad?.turns.forEach(turn => {
      //console.log(turn);
      const dayIndex = daysOfWeek.indexOf(turn.day);
      if (dayIndex !== -1) {
        // Find the corresponding date for the given day
        const dateForDay = dateRange.find(date => date.getDay() === dayIndex);
        if (dateForDay) {
          // Format the date as MM/DD
          const formattedDate = `${dateForDay.getDate()}/${dateForDay.getMonth() + 1}/${dateForDay.getFullYear()}`;
          this.formattedTurns.push({
            day: turn.day,
            date: formattedDate,
            turn: turn.turn
          });
        }
      }
    });
    console.log(this.formattedTurns);
  }

}
