import { Component, inject } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from '../../animations/slide.animation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    slideInAnimation
  ]
})
export class HomeComponent {

  router = inject(UtilsService);

  slide: number = 1;
  movingTowards = "";


  next()
  {
    this.slide += 1;
    if(this.slide > 3) this.slide = 1;
    console.log(this.slide);

    this.movingTowards = ":increment"
    console.log(this.movingTowards)
  }

  before()
  {
    this.slide -= 1;
    if(this.slide < 1) this.slide = 3;
    console.log(this.slide);
    this.movingTowards = ":decrement"
    console.log(this.movingTowards)
  }

}
