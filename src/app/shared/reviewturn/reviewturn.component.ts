import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reviewturn',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reviewturn.component.html',
  styleUrl: './reviewturn.component.scss'
})
export class ReviewturnComponent {
  reviewComment: string = '';
  stars: number = 0;

  constructor(private dialogRef: MatDialogRef<ReviewturnComponent>) {}

  // Handle "No Cancel" button click
  noCancelar(): void {
    this.dialogRef.close();  // Close without doing anything
  }

  // Handle "Cancelar" button click
  comment() {
    this.dialogRef.close(this.reviewComment + " ("+this.stars+"/5)");  // Return the cancellation comment
  }

  giveStars(points:number)
  {
    if(this.stars == 1 && points == 1)
    {
      this.stars = 0
    }
    else
    {
      this.stars = points;
    }
  }

}
