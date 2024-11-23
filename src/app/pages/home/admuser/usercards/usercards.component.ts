import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { SpecialityfilterPipe } from '../../../../pipes/specialityfilter.pipe';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from '../../../../services/schedule.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CancelturnComponent } from '../../../../shared/cancelturn/cancelturn.component';
import { MotiveturnComponent } from '../../../../shared/motiveturn/motiveturn.component';
import { ReviewturnComponent } from '../../../../shared/reviewturn/reviewturn.component';
import { UserfilterPipe } from '../../../../pipes/userfilter.pipe';
import { AgePipe } from '../../../../pipes/age.pipe';
import { HighlightmedicsDirective } from '../../../../directives/highlightmedics.directive';

import * as FileSaver from 'file-saver';
import { TurnDetailed } from '../../../../models/user/turn.model';
import { BackgroundimageComponent } from '../../../../shared/backgroundimage/backgroundimage.component';

@Component({
  selector: 'app-usercards',
  standalone: true,
  imports: [
    CommonModule,
    NgxSpinnerComponent,
    UserfilterPipe,
    FormsModule,
    AgePipe,
    HighlightmedicsDirective,
    BackgroundimageComponent
  ],
  templateUrl: './usercards.component.html',
  styleUrl: './usercards.component.scss'
})
export class UsercardsComponent implements OnInit{

  scheduleSvc = inject(ScheduleService);
  authSvc = inject(AuthService);
  spinner = inject(NgxSpinnerService);
  toastSvc = inject(ToastrService);
  busqueda: string ="";
  dialog = inject(MatDialog);

  myTurnsList: any[] = []
  cancelComentary: string = "";

  async ngOnInit() {

    this.spinner.show();

    await this.scheduleSvc.getTurns();
    await this.authSvc.getUserList();

    this.spinner.hide();

  }

  printTurns(user:any)
  {
    this.spinner.show()
    let userTurns: TurnDetailed[] = [];

    this.scheduleSvc.turnList.forEach(turn => {
      if(turn.doctor == user.userInfo.mail || turn.patient == user.userInfo.mail)
        userTurns.push(turn);      
    });

    const header = ['Dia', 'Turno', 'Doctor', 'Paciente', 'Especialidad', 'Estado'];
    const rows = userTurns.map(turn => [
      turn.date,
      turn.turn,
      turn.doctor,
      turn.patient,
      turn.speciality,
      turn.status
    ]);

    // Create a CSV string
    let csvContent = header.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    // Create a Blob and use FileSaver.js to download the CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'turnos.csv');

    this.spinner.hide();

  }

  

}
