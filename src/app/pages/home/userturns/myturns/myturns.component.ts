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
import { MotiveturnComponent } from '../../../../shared/motiveturn/motiveturn.component';
import { ReviewturnComponent } from '../../../../shared/reviewturn/reviewturn.component';



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

  async cancelTurn(turn: any)
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
        await this.scheduleSvc.cancelTurn(turn,this.cancelComentary);
        console.log(this.cancelComentary);
      }
    });
  }

  async motiveTurn(turn: any)
  {
    let comment = "";
    if(turn.status =='Cancelado')
      {
      comment = turn.review.comment;
    }
    else
    {
      comment = turn.review.mcomment;
    } 

    console.log(comment);

    const dialogRef = this.dialog.open(MotiveturnComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
      data: { status: turn.status, comment:comment}
    });
    console.log(dialogRef);

  }
  async reviewTurn(turn: any)
  {
    const dialogRef = this.dialog.open(ReviewturnComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
    });
    //console.log(dialogRef);

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        let reviewComment  = result;
        console.log(turn);
        await this.scheduleSvc.reviewTurn(turn,reviewComment);
        console.log(reviewComment);
      }
    });

  }

}