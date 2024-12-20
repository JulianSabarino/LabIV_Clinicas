import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cancelturn',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './cancelturn.component.html',
  styleUrl: './cancelturn.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CancelturnComponent {
  cancelComment: string = '';


  constructor(private dialogRef: MatDialogRef<CancelturnComponent>) {}

  // Handle "No Cancel" button click
  noCancelar(): void {
    this.dialogRef.close();  // Close without doing anything
  }

  // Handle "Cancelar" button click
  cancelar() {
    this.dialogRef.close(this.cancelComment);  // Return the cancellation comment
  }
}
