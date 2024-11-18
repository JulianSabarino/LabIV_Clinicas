import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TurnDetailed } from '../../models/user/turn.model';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-closeturnwithstory',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxSpinnerModule,FormsModule],
  templateUrl: './closeturnwithstory.component.html',
  styleUrl: './closeturnwithstory.component.scss'
})
export class CloseturnwithstoryComponent {

  utilsService = inject(UtilsService);
  scheduleSvc = inject(ScheduleService);
  spinner = inject(NgxSpinnerService);

  turn?: TurnDetailed
  commentary: string = "";
  keyOne: string = "";
  valueOne: string = "";
  keyTwo: string = "";
  valueTwo: string = "";

  constructor(private dialogRef: MatDialogRef<CloseturnwithstoryComponent> , @Inject(MAT_DIALOG_DATA) public data: { turn: TurnDetailed})
  {
    this.turn = data.turn;
  }

  form = new FormGroup({
    hight: new FormControl('',[Validators.required,Validators.min(24)]),
    weight: new FormControl('',[Validators.required,Validators.min(0.2)]),
    temperature: new FormControl('',[Validators.required,Validators.min(27),Validators.max(57)]),
    pressure: new FormControl('',[Validators.required])
  })

  async chargeClinicHistory()
  {
    this.spinner.show();

    let other: Record<string, string> = {};

    if(this.commentary != "")
      other['commentary'] = this.commentary
    if(this.keyOne != "" && this.valueOne != "")
      other[this.keyOne] = this.valueOne
    if(this.keyTwo != "" && this.valueTwo != "")
      other[this.keyTwo] = this.valueTwo

    if(this.form.valid)
    {

      let history: any = 
      {
        done: true,
        hight:this.form.value.hight,
        weight: this.form.value.weight ,
        temperature: this.form.value.temperature ,
        pressure: this.form.value.pressure ,
        other: other
      }
      try
      {
        this.scheduleSvc.historyTurn(this.turn,history)
      }
      catch
      {
        console.log("error");
      }

    }
    else
    {
      console.log("error en el form")
    }

    this.spinner.hide();
  }



  noCancelar(): void {
    this.dialogRef.close();  // Close without doing anything
  }

  // Handle "Cancelar" button click
  comment() {
    this.dialogRef.close();  // Return the cancellation comment
  }

  
}
