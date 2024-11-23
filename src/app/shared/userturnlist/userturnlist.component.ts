import { Component, Inject, inject, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TurnDetailed } from '../../models/user/turn.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusfilterPipe } from '../../pipes/statusfilter.pipe';
import { ShowhistoryComponent } from '../showhistory/showhistory.component';

@Component({
  selector: 'app-userturnlist',
  standalone: true,
  imports: [FormsModule,CommonModule,StatusfilterPipe],
  templateUrl: './userturnlist.component.html',
  styleUrl: './userturnlist.component.scss'
})
export class UserturnlistComponent{

  scheduleSrv = inject(ScheduleService);
  dialog = inject(MatDialog);

  myTurns: TurnDetailed[] = [];
  busqueda: string = "";

  constructor(private dialogRef: MatDialogRef<UserturnlistComponent>, @Inject(MAT_DIALOG_DATA) public data: { turns: TurnDetailed[]}) {
    this.myTurns = data.turns;
  }

  // Handle "No Cancel" button click
  close(): void {
    this.dialogRef.close();  // Close without doing anything
  }

  showHistory(turn: TurnDetailed)
  {
    console.log(turn);
    const dialogRef = this.dialog.open(ShowhistoryComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
      data: {turn:turn}
    });
    //console.log(dialogRef);
  }

}
