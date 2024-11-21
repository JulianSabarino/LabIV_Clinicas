import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightmedics]',
  standalone: true
})
export class HighlightmedicsDirective {

  @Input('appHighlightmedics') isMedic!: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.isMedic) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ADC698'); 
    }
  }
}
