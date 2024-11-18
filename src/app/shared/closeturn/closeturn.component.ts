import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CancelturnComponent } from '../cancelturn/cancelturn.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-closeturn',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './closeturn.component.html',
  styleUrl: './closeturn.component.scss'
})
export class CloseturnComponent {

  closeComment: string = '';


  constructor(private dialogRef: MatDialogRef<CloseturnComponent>) {}

  // Handle "No Cancel" button click
  noCancelar(): void {
    this.dialogRef.close();  // Close without doing anything
  }

  // Handle "Cancelar" button click
  comment() {
    this.dialogRef.close(this.closeComment);  // Return the cancellation comment
  }

}
