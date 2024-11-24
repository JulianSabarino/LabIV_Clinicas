import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TurnDetailed } from '../models/user/turn.model';

@Directive({
  selector: '[appTypeofturn]',
  standalone: true
})
export class TypeofturnDirective {

  @Input('appTypeofturn') turn!: TurnDetailed;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.turn.comment == "" && this.turn.status == "Finalizado") {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#F2BB05'); 
    }
    if (this.turn.comment != "" && this.turn.status == "Finalizado") {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#71F79F'); 
    }
  }


}
