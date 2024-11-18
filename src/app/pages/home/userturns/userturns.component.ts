import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../../../services/auth.service';
import { user } from '@angular/fire/auth';
import { Especialidades } from '../../../models/user/medicspeciality.model';
import { ScheduleService } from '../../../services/schedule.service';
import { TurnDetailed } from '../../../models/user/turn.model';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userturns',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './userturns.component.html',
  styleUrl: './userturns.component.scss',
})
export class UserturnsComponent implements OnInit{
  especialidadesSrv = inject(EspecialidadesService);
  authSrv = inject(AuthService);
  scheduleSrv = inject(ScheduleService);
  spinner = inject(NgxSpinnerService);
  toasterSvc = inject(ToastrService);
  
  selectedSpeciality: any;
  selectedMedic:any;
  selectedTurn:any;
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
    await this.scheduleSrv.getTurns();

    console.log(this.scheduleSrv.turnList);
  }

  selectEspecialidad(especialidad: any)
  {
    this.selectedSpeciality=especialidad;
    this.medicList=[];
    this.formattedTurns = []
    this.selectedTurn = null;

    this.authSrv.userList.forEach(user => {
      if(user.userInfo.medic && user.userInfo.info.includes(especialidad.name))
        this.medicList?.push(user);  
    });

  }

  async selectDoctor(doctor: any)
  {
    this.selectedMedic=doctor;
    this.selectedTurn = null;


    await this.especialidadesSrv.getLoggedEspecialidadesList(doctor.userInfo);


    this.selectedEspecialidad = this.especialidadesSrv.loggedEspecialities.find(speciality => speciality.name === this.selectedSpeciality.name)

    this.generateTurnsForNextWeek();
  }

  generateTurnsForNextWeek() {
    const today = new Date();
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    
    // Generate a date range from today to one week ahead
    let dateRange = [];
    for (let i = 1; i < 15; i++) {
      let futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      dateRange.push(futureDate);
    }

    
    // Loop through each day of the input turns and map them to dates
    
    this.formattedTurns = [];
    console.log(this.selectedEspecialidad?.turns)
    
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
  });

  this.formattedTurns.sort((a, b) => {
    // Ensure that the date strings are in MM/DD/YYYY format before creating Date objects
    const dateA = new Date(`${a.date.split('/')[1]}/${a.date.split('/')[0]}/${a.date.split('/')[2]}`); // MM/DD/YYYY
    const dateB = new Date(`${b.date.split('/')[1]}/${b.date.split('/')[0]}/${b.date.split('/')[2]}`); // MM/DD/YYYY

    // Type assertion: Ensuring dateA and dateB are Date objects
    return +dateA - +dateB;  // Using `+` to explicitly convert Date objects to timestamps (milliseconds)
});

  }


  selectTurn(turn: any)
  {
    this.selectedTurn = turn;
  }

  async getTurn()
  {
    this.spinner.show()
    let detail: TurnDetailed = 
    {
      date: this.selectedTurn.date,
      turn: this.selectedTurn.turn,
      doctor: this.selectedMedic.userInfo.mail,
      patient: this.authSrv.userProfile?.mail as string,
      speciality: this.selectedSpeciality.name,
      status: "Pendiente",
      review:
      {
        comment:"",
        mcomment:""
      }
    }
    try{
      await this.scheduleSrv.generateTurnByDateAndName(detail)
      this.toasterSvc.success("Turno creado correctamente","Exito");
    }
    catch
    {
      this.toasterSvc.error("Error al crear el turno","Alerta");      
    }

    this.medicList=[];
    this.formattedTurns = []
    this.selectedTurn = null;

    this.spinner.hide();
  }


  isValidHour(hour: string, day: string): boolean {

    
    let validTurn = true;
    this.scheduleSrv.turnList.forEach(turn => {
      if(turn.doctor == this.selectedMedic.userInfo.mail && turn.date == day && turn.turn == hour)
        {
          
        validTurn = false;
      }
    });
    
    return validTurn;
  
  }

}
