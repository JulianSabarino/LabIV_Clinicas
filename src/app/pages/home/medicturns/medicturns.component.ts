import { Component, inject, OnInit } from '@angular/core';
import { CancelturnComponent } from '../../../shared/cancelturn/cancelturn.component';
import { ScheduleService } from '../../../services/schedule.service';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SpecialityfilterPipe } from '../../../pipes/specialityfilter.pipe';
import { FormsModule } from '@angular/forms';
import { MotiveturnComponent } from '../../../shared/motiveturn/motiveturn.component';
import { CloseturnComponent } from '../../../shared/closeturn/closeturn.component';
import { CloseturnwithstoryComponent } from '../../../shared/closeturnwithstory/closeturnwithstory.component';

@Component({
  selector: 'app-medicturns',
  standalone: true,
  imports: [CommonModule,
    NgxSpinnerComponent,
    SpecialityfilterPipe,
    FormsModule],
  templateUrl: './medicturns.component.html',
  styleUrl: './medicturns.component.scss'
})
export class MedicturnsComponent implements OnInit{

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
      if(turn.doctor == this.authSvc.userProfile?.mail)
      {
        console.log(turn)
        this.myTurnsList.push(turn);
      }
    });

    this.spinner.hide();

  }

  async declineTurn(turn: any)
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
        //await this.scheduleSvc.declineTurn(turn,this.cancelComentary);
        await this.scheduleSvc.advanceTurn(turn,this.cancelComentary,"Rechazado");
        console.log(this.cancelComentary);
      }
    });
  }

  async acceptTurn(turn: any)
  {
    //await this.scheduleSvc.acceptTurn(turn);
    await this.scheduleSvc.advanceTurn(turn,"","Aceptado");
  }
  
  async endTurn(turn: any)
  {
    const dialogRef = this.dialog.open(CloseturnComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
    });
    console.log(dialogRef);

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        let closeComment  = result;
        await this.scheduleSvc.closeTurn(turn,closeComment);
        console.log(closeComment);
      }
    });
  }
  async historyTurn(turn: any)
  {
    const dialogRef = this.dialog.open(CloseturnwithstoryComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
      data: {turn:turn}
    });
    console.log(dialogRef);

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');

    });
  }



  async motiveTurn(turn: any)
  {
    const dialogRef = this.dialog.open(MotiveturnComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
      data: { status: turn.status, comment:turn.comment}
    });
    console.log(dialogRef);

  }

}
