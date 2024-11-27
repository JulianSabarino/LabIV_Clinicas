import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mycaptcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mycaptcha.component.html',
  styleUrl: './mycaptcha.component.scss'
})
export class MycaptchaComponent {

  num1: number = 0;
  num2: number = 0;
  operator: string = '+';
  correctAnswer: number = 0;
  userAnswer: string = ''; // Changed to string to handle potential non-numeric input
  isCorrect: boolean | null = null;
  errorMessage: string = '';

  constructor(private dialogRef: MatDialogRef<MycaptchaComponent>){}

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    this.num1 = Math.floor(Math.random() * 10) + 1;
    this.num2 = Math.floor(Math.random() * 10) + 1;
    this.operator = this.getRandomOperator();
    this.calculateAnswer();
    this.userAnswer = '';
    this.isCorrect = null;
    this.errorMessage = '';
  }


  getRandomOperator(): string {
    const operators = ['+', '-', '*'];
    return operators[Math.floor(Math.random() * operators.length)];
  }

  calculateAnswer(): void {
    switch (this.operator) {
      case '+':
        this.correctAnswer = this.num1 + this.num2;
        break;
      case '-':
        this.correctAnswer = this.num1 - this.num2;
        break;
      case '*':
        this.correctAnswer = this.num1 * this.num2;
        break;
      default:
        this.correctAnswer = 0; //Should never happen with getRandomOperator but good practice
        break;

    }
  }

  checkAnswer(): void {
    this.isCorrect = false;
    if (!isNaN(parseInt(this.userAnswer))) {
      this.isCorrect = parseInt(this.userAnswer) === this.correctAnswer;  
    }
    
    this.dialogRef.close(this.isCorrect);  // Return the cancellation comment
  
  }




}
