import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ScheduleService } from '../../../../services/schedule.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CancelturnComponent } from '../../../../shared/cancelturn/cancelturn.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MotiveturnComponent } from '../../../../shared/motiveturn/motiveturn.component';
import { ReviewturnComponent } from '../../../../shared/reviewturn/reviewturn.component';
import { from, Observable, Subscription } from 'rxjs';
import { BackgroundimageComponent } from '../../../../shared/backgroundimage/backgroundimage.component';
import { TurnDetailed } from '../../../../models/user/turn.model';
import { ImprovedturnfullfilterPipe } from '../../../../pipes/improvedturnfullfilter.pipe';
import { ShowhistoryComponent } from '../../../../shared/showhistory/showhistory.component';
import { StateofturnDirective } from '../../../../directives/stateofturn.directive';



@Component({
  selector: 'app-myturns',
  standalone: true,
  imports: [CommonModule,
    NgxSpinnerComponent,
    FormsModule,
    BackgroundimageComponent,
    ImprovedturnfullfilterPipe,
    StateofturnDirective 
  ],
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
      this.myTurnsList = turns.filter(turn => turn.patient === this.authSvc.userProfile?.mail);
      console.log("estoy observado" + this.myTurnsList);
    });
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
        this.spinner.show();
        this.cancelComentary  = result;
        await this.scheduleSvc.advanceTurn(turn,this.cancelComentary,"Cancelado")
        this.toastSvc.success("Turno cancelado con exito","Cancelación de Turno");
        await this.scheduleSvc.getTurns();
        await this.loadTurns();
        this.spinner.hide();
      }
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
  async reviewTurn(turn: any)
  {
    const dialogRef = this.dialog.open(ReviewturnComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.spinner.show();
        let reviewComment  = result;
        console.log(turn);
        await this.scheduleSvc.advanceTurn(turn,reviewComment,"Finalizado");
        this.toastSvc.success("Reseña entregada","Reseña");
        await this.scheduleSvc.getTurns();
        await this.loadTurns();
        console.log(reviewComment);
        this.spinner.hide();
      }
    });

  }

  viewHistory(turn: any)
  {
    console.log(turn);
    const dialogRef = this.dialog.open(ShowhistoryComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
      data: {turn:turn}
    });
  }

}