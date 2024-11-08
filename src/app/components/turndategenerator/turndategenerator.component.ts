import { Component, inject } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScheduleService } from '../../services/schedule.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turndategenerator',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './turndategenerator.component.html',
  styleUrl: './turndategenerator.component.scss'
})
export class TurndategeneratorComponent {
  utilsService = inject(UtilsService);
  turnService = inject(ScheduleService);
  spinner = inject(NgxSpinnerService);

  form = new FormGroup({
    date: new FormControl(''),
  })

  async registerTurn()
  {
    this.spinner.show();

    try
    {
      await this.turnService.generateTurnsByDay(this.form.value.date as string)
    }
    catch
    {
      console.log("error");
    } 

    this.spinner.hide();
  }
}
