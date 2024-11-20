import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { EspecialidadesService } from '../../../../services/especialidades.service';
import { ScheduleService } from '../../../../services/schedule.service';
import { NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Turn } from '../../../../models/user/turn.model';

@Component({
  selector: 'app-medic',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule],
  templateUrl: './medic.component.html',
  styleUrl: './medic.component.scss'
})
export class MedicComponent implements OnInit{
  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  authService = inject(AuthService);
  especialitiesService = inject(EspecialidadesService);
  scheduleService = inject(ScheduleService);
  spinner = inject(NgxSpinnerService);
  toastSvc = inject(ToastrService);


  myEspecialidades: any [] = [];
  myUsers: any[] = []
  selectedEspecialidad: any;

  async ngOnInit() {
    this.spinner.show();

    await this.authService.getUserList();
    await this.especialitiesService.getEspecialidadesList();
    await this.scheduleService.getTurns();
    await this.especialitiesService.getLoggedEspecialidadesList(this.authService.userProfile);
    //console.log(this.authService.userProfile);
    console.log(this.especialitiesService.loggedEspecialities);

    console.log(this.authService.userList);

    this.authService.userList.forEach(user => {

      let matchUser = this.scheduleService.turnList.filter(turn => turn.patient === user.userInfo.mail)

      if(matchUser.length > 0)
        this.myUsers.push(user);
      
    });
    
    this.spinner.hide();
  }

  isValidHour(hour: string, day: string): boolean {
      if (day == 'Sábado') {
        return this.scheduleService.satTurns.includes(hour);
      } else {
        return this.scheduleService.baseTurns.includes(hour);
      }
  }

  selectEspecialidad(especialidad: any)
  {
    this.selectedEspecialidad = especialidad;
  }

  isWorkHour(hour: string, day: string): boolean {

    let speciality = this.especialitiesService.loggedEspecialities.find(speciality => speciality.name === this.selectedEspecialidad.name);
    let isWorkHour = false;

    //console.log(speciality);
    speciality?.turns.forEach(turn => {
      if(turn.day === day && turn.turn === hour)
        isWorkHour =  true
    });
  
    return isWorkHour; 
}

addRemoveSpeciality(hour: string, day: string)
{

  let speciality = this.especialitiesService.loggedEspecialities.find(speciality => speciality.name === this.selectedEspecialidad.name);

  if (speciality) {
    // Find the index of the turn that matches both hour and day
    const turnIndex = speciality.turns.findIndex(turn => turn.turn === hour && turn.day === day);

    if (turnIndex !== -1) {
      // If the turn exists, remove it from the array
      speciality.turns.splice(turnIndex, 1);
    } else {
      // If the turn doesn't exist, add it to the array
      let temptTurn : Turn = {
        day:day,
        turn:hour
      }
      speciality.turns.push(temptTurn);
    }

    console.log(this.especialitiesService.loggedEspecialities)

  }
}

async saveSpecialities()
{
  this.spinner.show();
  await  this.especialitiesService.updateLoggerdEspecialidades(this.authService.userProfile);
  this.spinner.hide();
}

}


/*
this.selectedEspecialidad?.turns.forEach(turn => {
  const dayIndex = daysOfWeek.indexOf(turn.day);
  if (dayIndex !== -1) {
      // Find all matching dates in the 15-day range that correspond to the correct weekday
      const matchingDates = dateRange.filter(date => date.getDay() === dayIndex);
      
      matchingDates.forEach(dateForDay => {
          // Format the date as DD/MM/YYYY
          const formattedDate = `${dateForDay.getDate()}/${dateForDay.getMonth() + 1}/${dateForDay.getFullYear()}`;
          
          // Check if the turn is valid for this specific date
          if(this.isValidHour(turn.turn, formattedDate)) {
              this.formattedTurns.push({
                  day: turn.day,
                  date: formattedDate,
                  turn: turn.turn
              });
          }
      });
  }
});*/
