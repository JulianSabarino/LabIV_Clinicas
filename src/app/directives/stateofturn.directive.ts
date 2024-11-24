import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TurnDetailed } from '../models/user/turn.model';

@Directive({
  selector: '[appStateofturn]',
  standalone: true
})
export class StateofturnDirective {

  @Input('appStateofturn') turn!: TurnDetailed;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.turn.status == "Aceptado") {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#124E78'); 
    }
    if (this.turn.status == "Rechazado" || this.turn.status == "Cancelado") {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#D90429'); 
    }
    if (this.turn.status == "Finalizado") {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#71F79F'); 
    }
  }

}
