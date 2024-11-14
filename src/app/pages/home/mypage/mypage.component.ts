import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mypage',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './mypage.component.html',
  styleUrl: './mypage.component.scss'
})
export class MypageComponent implements OnInit{
  authService = inject(AuthService);
  spinner = inject(NgxSpinnerService);

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



  ngOnInit(): void {
    this.frase = this.generarFrase();
  }


  generarFrase() {
    // Genera un número aleatorio entre 1 y 5
    return Math.floor(Math.random() * 5);
  }
  
}
