import { Component, inject } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { CommonModule } from '@angular/common';
import { rightLeftAnimation } from '../../../animations/rightleft.animation';
import { BackgroundimageComponent } from '../../../shared/backgroundimage/backgroundimage.component';

@Component({
  selector: 'app-registerselect',
  standalone: true,
  imports: [CommonModule,BackgroundimageComponent],
  templateUrl: './registerselect.component.html',
  styleUrl: './registerselect.component.scss',
  animations: [
    rightLeftAnimation
  ]
})
export class RegisterselectComponent {

  router = inject(UtilsService);

}
