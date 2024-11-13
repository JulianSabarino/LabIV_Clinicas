import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ScheduleService } from '../../../../services/schedule.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SpecialityfilterPipe } from '../../../../pipes/specialityfilter.pipe';
import { FormsModule } from '@angular/forms';
import { CancelturnComponent } from '../../../../shared/cancelturn/cancelturn.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-myturns',
  standalone: true,
  imports: [CommonModule,
    NgxSpinnerComponent,
    SpecialityfilterPipe,
    FormsModule],
  templateUrl: './myturns.component.html',
  styleUrl: './myturns.component.scss'
})
export class MyturnsComponent implements OnInit{

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

  async sendReview(turn: any)
  {
    const dialogRef = this.dialog.open(CancelturnComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
    });
    console.log(dialogRef);

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.cancelComentary  = result;
        await this.scheduleSvc.leaveReview(turn,this.cancelComentary);
        console.log(this.cancelComentary);
      }
    });
  }

  
  cancelModal()
  {
    const dialogRef = this.dialog.open(CancelturnComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
    });
    console.log(dialogRef);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.cancelComentary  = result;
        console.log(this.cancelComentary);
      }
    });
  }

}