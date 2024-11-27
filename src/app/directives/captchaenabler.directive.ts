import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { MycaptchaComponent } from '../shared/mycaptcha/mycaptcha.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[appCaptchaenabler]',
  standalone: true
})
export class CaptchaenablerDirective {

//  @Input('appCaptchaenabler')
  dialog = inject(MatDialog);
  toastSvc = inject(ToastrService)

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  async ngOnInit() {
    const dialogRef = this.dialog.open(MycaptchaComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
    });
    console.log(dialogRef);

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      if (result == true) {
        console.log("captcha ok")
        this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ADC698'); 
        this.renderer.setStyle(this.el.nativeElement, 'border-color', '#ADC698'); 
        this.renderer.setStyle(this.el.nativeElement, 'color', '#000000'); 
        this.toastSvc.success("Captcha satisfactorio", "Exito")
      }
      else
      {
        this.toastSvc.error("Captcha erroneo", "Error")
      }
    });
  }

}
