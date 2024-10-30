import { Component, inject } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  router = inject(UtilsService);

  slide: number = 1;


  next()
  {
    this.slide += 1;
    if(this.slide > 3) this.slide = 1;
    console.log(this.slide);
  }

  before()
  {
    this.slide -= 1;
    if(this.slide < 1) this.slide = 3;
    console.log(this.slide);
  }

}
