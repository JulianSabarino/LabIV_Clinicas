import { AfterContentInit, Component, inject, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { GraphsService } from '../../services/graphs.service';
import { CommonModule } from '@angular/common';
import { TurnsperspecialityComponent } from './turnsperspeciality/turnsperspeciality.component';
import { TurnsperdayComponent } from './turnsperday/turnsperday.component';
import { TurnsaskedbyrangeComponent } from './turnsaskedbyrange/turnsaskedbyrange.component';
import { TurnsfinishedbyrangeComponent } from './turnsfinishedbyrange/turnsfinishedbyrange.component';


@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [HighchartsChartModule, CommonModule,TurnsperspecialityComponent,TurnsperdayComponent,TurnsaskedbyrangeComponent, TurnsfinishedbyrangeComponent],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss'
})
export class GraphicsComponent implements OnInit {


  constructor() { }

  async ngOnInit() {
  }




}
