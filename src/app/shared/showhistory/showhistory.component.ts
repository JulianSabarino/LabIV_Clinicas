import { Component, Inject } from '@angular/core';
import { TurnDetailed } from '../../models/user/turn.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-showhistory',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './showhistory.component.html',
  styleUrl: './showhistory.component.scss'
})
export class ShowhistoryComponent {

  turn?: TurnDetailed;
  otherList?: any[]


  constructor(private dialogRef: MatDialogRef<ShowhistoryComponent>, @Inject(MAT_DIALOG_DATA) public data: { turn: TurnDetailed}) {
    console.log(data.turn);
    this.turn = data.turn;
    this.otherList = Object.entries(this.turn?.history?.other || {});
  }

  // Handle "No Cancel" button click
  close(): void {
    this.dialogRef.close();  // Close without doing anything
  }

}
