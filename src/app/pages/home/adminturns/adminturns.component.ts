import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { SpecialityfilterPipe } from '../../../pipes/specialityfilter.pipe';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from '../../../services/schedule.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CancelturnComponent } from '../../../shared/cancelturn/cancelturn.component';

@Component({
  selector: 'app-adminturns',
  standalone: true,
  imports: [CommonModule,
    NgxSpinnerComponent,
    SpecialityfilterPipe,
    FormsModule],
  templateUrl: './adminturns.component.html',
  styleUrl: './adminturns.component.scss'
})
export class AdminturnsComponent implements OnInit{

  scheduleSvc = inject(ScheduleService);
  spinner = inject(NgxSpinnerService);
  toastSvc = inject(ToastrService);
  busqueda: string ="";
  dialog = inject(MatDialog);

  cancelComentary: string = "";

  async ngOnInit() {

    this.spinner.show();

    await this.scheduleSvc.getTurns();
    console.log(this.scheduleSvc.turnList);

    this.spinner.hide();
  }

  async cancelTurn(turn: any)
  {
    const dialogRef = this.dialog.open(CancelturnComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
    });
    console.log(dialogRef);

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.cancelComentary  = result;
        await this.scheduleSvc.cancelTurn(turn,this.cancelComentary);
        console.log(this.cancelComentary);
      }
    });
  }

}