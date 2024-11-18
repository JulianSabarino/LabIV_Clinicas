import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CancelturnComponent } from '../cancelturn/cancelturn.component';

@Component({
  selector: 'app-motiveturn',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './motiveturn.component.html',
  styleUrl: './motiveturn.component.scss'
})
export class MotiveturnComponent {


  status: string;
  comment: string;


  constructor(private dialogRef: MatDialogRef<MotiveturnComponent>, @Inject(MAT_DIALOG_DATA) public data: { status: string, comment: string }) {
    this.status = data.status;
    this.comment = data.comment;
  }

  // Handle "No Cancel" button click
  close(): void {
    this.dialogRef.close();  // Close without doing anything
  }


}
