import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from '../../services/schedule.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TurnDetailed } from '../../models/user/turn.model';
import { AuthService } from '../../services/auth.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-showmymediclist',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './showmymediclist.component.html',
  styleUrl: './showmymediclist.component.scss'
})
export class ShowmymediclistComponent {

  scheduleSrv = inject(ScheduleService);
  dialog = inject(MatDialog);

  myTurns: TurnDetailed[] = [];
  myMedics: any[] = []
  busqueda: string = "";

  constructor(private dialogRef: MatDialogRef<ShowmymediclistComponent>, @Inject(MAT_DIALOG_DATA) public data: { turns: TurnDetailed[], userList: any[]}) {
    this.myTurns = data.turns;

    console.log(data.turns);


    data.userList.forEach(user => {

      let matchUser = this.myTurns.filter(turn => turn.doctor === user.userInfo.mail)

      if(matchUser.length > 0)
        this.myMedics.push(user);
      
    });
    

  }

  // Handle "No Cancel" button click
  close(): void {
    this.dialogRef.close();  // Close without doing anything
  }


  downloadPDF(doctor: string) {
    const doc = new jsPDF();

    // Path to the background image (PNG)
    const imagePath = 'assets/logo.png'; // Update the path to your PNG image
    
    // Create a new image element
    const img = new Image();
    img.src = imagePath;

    // Get current date and time
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);

    let turns: TurnDetailed[] = [];

    this.myTurns.forEach(turn => {
      if(turn.doctor == doctor)       
        turns.push(turn)
    });

    img.onload = () => {
      // Loop through each turn and generate a new page for each one
      let index = 0;
      turns.forEach((turn) => {

        if(turn.status == "Finalizado")
        {
          index += 1;
        // If it's not the first turn, add a new page
          if (index > 1) {
            doc.addPage();
          }

        // Set image dimensions and position (small size in the top right corner)
        const imgWidth = 40; // Image width (adjust as needed)
        const imgHeight = 40; // Image height (adjust as needed)
        const xPosition = 170; // X position (right side, you can adjust this)
        const yimagePosition = 10; // Y position (top side, adjust as needed)

        // Add the image to the top right corner of the page
        doc.addImage(img, 'PNG', xPosition, yimagePosition, imgWidth, imgHeight);

        // Add the text "Clinica S" beneath the image
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Clinica S', xPosition + 13, yimagePosition + imgHeight);

        // Add the current date in the upper left corner
        doc.setFontSize(10);
        doc.text(formattedDate, 20, 10); // Add the formatted date at the upper left corner

        // Set the opacity for the content that follows
        //doc.setGState({ opacity: 0.25 });

        // Add the content for the turn
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);

        // Title (from the modal)
        doc.text(`${turn?.doctor} (${turn?.date} - ${turn?.turn})`, 105, 20, { align: 'center' });

        // Add rows like Altura and Peso, and Temperatura and Presion
        let yPosition = 30;
        doc.text(`Altura: ${turn?.history?.hight} Cm`, 20, yPosition);
        yPosition += 10;
        doc.text(`Peso: ${turn?.history?.weight} Kg`, 20, yPosition);
        yPosition += 10;
        doc.text(`Temperatura: ${turn?.history?.temperature} °C`, 20, yPosition);
        yPosition += 10;
        doc.text(`Presion: ${turn?.history?.pressure}`, 20, yPosition);

        // Add other items dynamically
        yPosition += 15;
        doc.text('Otros:', 20, yPosition);

        let otherList  = Object.entries(turn.history?.other || {});

        if(otherList)
        otherList.forEach(item => {
          yPosition += 10;
          const label = item[0] !== 'commentary' ? `${item[0]}:` : 'Comentario:';
          doc.text(`${label} ${item[1]}`, 20, yPosition);
        });

        // Ensure that there's space for the next page if needed
        if (index < turns.length - 1) {
          //doc.addPage();
        }
      }});

      // Save the PDF
      doc.save('turns_data.pdf');
    };

    img.onerror = (error) => {
      console.error("Error loading the image", error);
    };
  }

  // Helper method to format the current date as dd/MM/yyyy - hh:mm
  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2); // Ensure 2 digits for day
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ensure 2 digits for month
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2); // Ensure 2 digits for hours
    const minutes = ('0' + date.getMinutes()).slice(-2); // Ensure 2 digits for minutes

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

}
