import { Component, inject, OnInit } from '@angular/core';
import { CancelturnComponent } from '../../../shared/cancelturn/cancelturn.component';
import { ScheduleService } from '../../../services/schedule.service';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotiveturnComponent } from '../../../shared/motiveturn/motiveturn.component';
import { CloseturnComponent } from '../../../shared/closeturn/closeturn.component';
import { CloseturnwithstoryComponent } from '../../../shared/closeturnwithstory/closeturnwithstory.component';
import { Subscription } from 'rxjs';
import { BackgroundimageComponent } from '../../../shared/backgroundimage/backgroundimage.component';
import { ImprovedturnfullfilterPipe } from '../../../pipes/improvedturnfullfilter.pipe';
import { TurnDetailed } from '../../../models/user/turn.model';
import { StateofturnDirective } from '../../../directives/stateofturn.directive';

@Component({
  selector: 'app-medicturns',
  standalone: true,
  imports: [CommonModule,
    NgxSpinnerComponent,
    FormsModule,
    BackgroundimageComponent,
    ImprovedturnfullfilterPipe,
    StateofturnDirective
  ],
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

  myTurnsList: TurnDetailed[] = []
  cancelComentary: string = "";

  private turnListSubscription: Subscription | undefined;  // Add subscription property

  async ngOnInit() {
    this.spinner.show();
    this.loadTurns();
    await this.scheduleSvc.getTurns();
    console.log(this.turnListSubscription)
    this.spinner.hide();

  }

  async loadTurns()
  {
    this.turnListSubscription = this.scheduleSvc.turnList$.subscribe(turns => {
      this.myTurnsList = turns.filter(turn => turn.doctor === this.authSvc.userProfile?.mail);
      console.log("estoy observado" + this.myTurnsList);
    });
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
        this.spinner.show();
        this.cancelComentary  = result;
        await this.scheduleSvc.advanceTurn(turn,this.cancelComentary,"Rechazado");
        await this.scheduleSvc.getTurns();
        await this.loadTurns();
        this.toastSvc.info("Rechazo", "Turno rechazado exitosamente");
        this.spinner.hide();
        console.log(this.cancelComentary);
      }
    });
  }

  async acceptTurn(turn: any)
  {
    this.spinner.show();
    await this.scheduleSvc.advanceTurn(turn,"","Aceptado");
    await this.scheduleSvc.getTurns();
    await this.loadTurns();
    this.toastSvc.success("Exito", "Turno aceptado exitosamente");
    this.spinner.hide();

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
      this.spinner.show();
      await this.scheduleSvc.getTurns();
      await this.loadTurns();
      //this.toastSvc.success("Exito", "Turno aceptado exitosamente");
      this.spinner.hide();

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
