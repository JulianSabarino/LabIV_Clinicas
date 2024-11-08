import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-myturns',
  standalone: true,
  imports: [CommonModule,NgxSpinnerComponent],
  templateUrl: './myturns.component.html',
  styleUrl: './myturns.component.scss'
})
export class MyturnsComponent implements OnInit{

  scheduleSvc = inject(ScheduleService);
  authSvc = inject(AuthService);
  spinner = inject(NgxSpinnerService);
  toastSvc = inject(ToastrService);

  myTurnsList: any[] = []

  ngOnInit() {

    this.spinner.show();

    this.scheduleSvc.getTurns();

    this.scheduleSvc.turnList.forEach(turn => {
      if(turn.patient == this.authSvc.userProfile?.mail)
      {
        console.log(turn)
        this.myTurnsList.push(turn);
      }
    });

    this.spinner.hide();

  }

}
