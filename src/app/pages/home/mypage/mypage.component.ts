import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ScheduleService } from '../../../services/schedule.service';
import { TurnDetailed } from '../../../models/user/turn.model';
import { CommonModule } from '@angular/common';
import { ShowhistoryComponent } from '../../../shared/showhistory/showhistory.component';
import { MatDialog } from '@angular/material/dialog';
import { BackgroundimageComponent } from '../../../shared/backgroundimage/backgroundimage.component';
import { ShowmymediclistComponent } from '../../../shared/showmymediclist/showmymediclist.component';
import { getRotatedAnimation } from '../../../animations/getrotated.animation';

@Component({
  selector: 'app-mypage',
  standalone: true,
  imports: [NgxSpinnerModule,CommonModule, BackgroundimageComponent],
  templateUrl: './mypage.component.html',
  styleUrl: './mypage.component.scss',
  animations:[getRotatedAnimation]
})
export class MypageComponent implements OnInit{
  authService = inject(AuthService);
  scheduleSvc = inject(ScheduleService);
  spinner = inject(NgxSpinnerService);
  dialog = inject(MatDialog);

  myTurnsList: TurnDetailed[] = [];



 async ngOnInit() {
    this.spinner.show()
    await this.scheduleSvc.getTurns();

      this.scheduleSvc.turnList.forEach(turn => {
      if(turn.patient == this.authService.userProfile?.mail)
      {
        console.log(turn)
        this.myTurnsList.push(turn);
      }
    });
    this.spinner.hide();
  }


  showHistory(turn: TurnDetailed)
  {
    const dialogRef = this.dialog.open(ShowhistoryComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
      data: {
        turn:turn,
        showPDF: true
      }
    });
  }


  async showMedicListModal()
  {
    await this.authService.getUserList();

    console.log(this.myTurnsList)
  
    const dialogRef = this.dialog.open(ShowmymediclistComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
      data: {
        turns:this.myTurnsList,
        userList: this.authService.userList
      }
    });
  }
  
}
