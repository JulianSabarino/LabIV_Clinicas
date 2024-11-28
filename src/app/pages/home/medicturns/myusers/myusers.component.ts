import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../../services/auth.service';
import { ScheduleService } from '../../../../services/schedule.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TurnDetailed } from '../../../../models/user/turn.model';
import { UserturnlistComponent } from '../../../../shared/userturnlist/userturnlist.component';
import { BackgroundimageComponent } from '../../../../shared/backgroundimage/backgroundimage.component';

@Component({
  selector: 'app-myusers',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule, BackgroundimageComponent],
  templateUrl: './myusers.component.html',
  styleUrl: './myusers.component.scss'
})
export class MyusersComponent implements OnInit{


  authService = inject(AuthService);
  scheduleService = inject(ScheduleService);
  spinner = inject(NgxSpinnerService);
  toastSvc = inject(ToastrService);
  dialog = inject(MatDialog);


  myEspecialidades: any [] = [];
  myUsers: any[] = []
  selectedEspecialidad: any;

  async ngOnInit() {
    this.spinner.show();

    await this.authService.getUserList();
    await this.scheduleService.getTurns();

    console.log(this.authService.userList);

    this.authService.userList.forEach(user => {

      let matchUser = this.scheduleService.turnList.filter(turn => turn.patient === user.userInfo.mail)

      if(matchUser.length > 0)
        this.myUsers.push(user);
      
    });
    
    this.spinner.hide();
  }


  async openUserTurnList(user: any)
  {
    let userTurns: TurnDetailed[] = [];
    this.scheduleService.turnList.forEach(turn => {
      if(turn.patient==user.userInfo.mail && turn.status != "Rechazado")
        userTurns.push(turn);
    });
  
    const dialogRef = this.dialog.open(UserturnlistComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
      data: {turns:userTurns}
    });
  
  }

}
