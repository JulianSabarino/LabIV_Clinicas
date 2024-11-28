import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ScheduleService } from '../../../services/schedule.service';
import { TurnDetailed } from '../../../models/user/turn.model';
import { CommonModule } from '@angular/common';
import { ShowhistoryComponent } from '../../../shared/showhistory/showhistory.component';
import { MatDialog } from '@angular/material/dialog';
import { BackgroundimageComponent } from '../../../shared/backgroundimage/backgroundimage.component';
import { ShowmymediclistComponent } from '../../../shared/showmymediclist/showmymediclist.component';
import { getRotatedAnimation } from '../../../animations/getrotated.animation';

@Component({
  selector: 'app-mypage',
  standalone: true,
  imports: [NgxSpinnerModule,CommonModule, BackgroundimageComponent],
  templateUrl: './mypage.component.html',
  styleUrl: './mypage.component.scss',
  animations:[getRotatedAnimation]
})
export class MypageComponent implements OnInit{
  authService = inject(AuthService);
  scheduleSvc = inject(ScheduleService);
  spinner = inject(NgxSpinnerService);
  dialog = inject(MatDialog);

  myTurnsList: TurnDetailed[] = [];

  frase: number = 0;
  frasesList: any[] = [
    {
        title: "Prioriza el sueño reparador",
        text: "Dormir lo suficiente es fundamental para tu salud física y mental. Establece una rutina de sueño y crea un ambiente tranquilo en tu habitación para descansar mejor."
    },
    {
        title: "Incorpora el movimiento a tu día a día",
        text: "No necesitas ir al gimnasio todos los días. Pequeños cambios como subir escaleras, caminar o hacer estiramientos pueden marcar una gran diferencia en tu bienestar."
    },
    {
        title: "Conéctate con la naturaleza",
        text: "Pasa tiempo al aire libre, ya sea dando un paseo por el parque, cultivando plantas o simplemente disfrutando del sol. La naturaleza tiene un efecto calmante y rejuvenecedor."
    },
    {
        title: "Practica la gratitud",
        text: "Agradecer las cosas buenas de tu vida te ayuda a mantener una actitud positiva y a reducir el estrés. Dedica unos minutos cada día a reflexionar sobre lo que valoras."
    },
    {
        title: "Limita el tiempo frente a pantallas",
        text: "La exposición excesiva a dispositivos electrónicos puede afectar tu sueño, aumentar la ansiedad y disminuir tu productividad. Establece límites para el uso de teléfonos, computadoras y televisión."
    }
];



 async ngOnInit() {
    this.spinner.show()
    this.frase = this.generarFrase();
    await this.scheduleSvc.getTurns();

      this.scheduleSvc.turnList.forEach(turn => {
      if(turn.patient == this.authService.userProfile?.mail)
      {
        console.log(turn)
        this.myTurnsList.push(turn);
      }
    });
    this.spinner.hide();
  }


  generarFrase() {
    // Genera un número aleatorio entre 1 y 5
    return Math.floor(Math.random() * 5);
  }

  showHistory(turn: TurnDetailed)
  {
    //console.log(turn);
    const dialogRef = this.dialog.open(ShowhistoryComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
      data: {
        turn:turn,
        showPDF: true
      }
    });
    //console.log(dialogRef);
  }


  async showMedicListModal()
  {
    await this.authService.getUserList();

    console.log(this.myTurnsList)
  
    const dialogRef = this.dialog.open(ShowmymediclistComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
      data: {
        turns:this.myTurnsList,
        userList: this.authService.userList
      }
    });
  }
  
}
