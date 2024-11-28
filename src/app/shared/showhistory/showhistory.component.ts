import { Component, Inject } from '@angular/core';
import { TurnDetailed } from '../../models/user/turn.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';  // Import jsPDFn

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
    //console.log(data.turn);
    this.turn = data.turn;
    this.otherList = Object.entries(this.turn?.history?.other || {});
  }

  // Handle "No Cancel" button click
  close(): void {
    this.dialogRef.close();  // Close without doing anything
  }

  downloadPDF() {
    const content = document.getElementById('content-to-pdf'); // Get the modal content to print
    
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Path to the background image (PNG)
    const imagePath = 'assets/logo.png'; // Update the path to your PNG image
    
    // Create a new image element
    const img = new Image();
    img.src = imagePath;

    img.onload = () => {
      // Set image dimensions and position (small size in the top right corner)
      const imgWidth = 40; // Image width (adjust as needed)
      const imgHeight = 40; // Image height (adjust as needed)
      const xPosition = 170; // X position (right side, you can adjust this)
      const yimagePosition = 0; // Y position (top side, adjust as needed)

      // Add the image to the top right corner of the page
      doc.addImage(img, 'PNG', xPosition, yimagePosition, imgWidth, imgHeight);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Clinica S', xPosition + 13, yimagePosition + imgHeight);

      const currentDate = new Date();
      const formattedDate = this.formatDate(currentDate);

      doc.text(formattedDate, 20, 10);
      
      // Set the opacity for the content that follows
      //doc.setGState({ opacity: 0.25 });

      // Add the content from the modal (text and data)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);

      // Title (from the modal)
      doc.text(`${this.turn?.date} - ${this.turn?.turn}`, 105, 20, { align: 'center' });

      // Add rows like Altura and Peso, and Temperatura and Presion
      let yPosition = 30;
      doc.text(`Altura: ${this.turn?.history?.hight} Cm`, 20, yPosition);
      yPosition += 10;
      doc.text(`Peso: ${this.turn?.history?.weight} Kg`, 20, yPosition);
      yPosition += 10;
      doc.text(`Temperatura: ${this.turn?.history?.temperature} °C`, 20, yPosition);
      yPosition += 10;
      doc.text(`Presion: ${this.turn?.history?.pressure}`, 20, yPosition);

      // Add other items dynamically
      yPosition += 15;
      doc.text('Otros:', 20, yPosition);
      if(this.otherList)
      this.otherList.forEach(item => {
        yPosition += 10;
        const label = item[0] != 'commentary' ? `${item[0]}:` : 'Comentario:';
        doc.text(`${label} ${item[1]}`, 20, yPosition);
      });

      // Save the PDF
      doc.save('turn_data.pdf');
    };

    img.onerror = (error) => {
      console.error("Error loading the image", error);
    };
  }

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2); // Ensure 2 digits for day
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ensure 2 digits for month
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2); // Ensure 2 digits for hours
    const minutes = ('0' + date.getMinutes()).slice(-2); // Ensure 2 digits for minutes

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

}
