import { AfterContentInit, Component, inject, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { GraphsService } from '../../services/graphs.service';
import { CommonModule } from '@angular/common';
import { TurnsperspecialityComponent } from './turnsperspeciality/turnsperspeciality.component';


@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [HighchartsChartModule, CommonModule,TurnsperspecialityComponent],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss'
})
export class GraphicsComponent implements OnInit {

  graphSvc = inject(GraphsService);

  Highcharts = Highcharts;


  turnsPD_HC = Highcharts;  // Set Highcharts object
  turnsPD_CO: Highcharts.Options = {};  // Initialize empty chart options
  turnsPD_CD?: {
    categories: string[],
    data: number[]
  };

  turnsPS_HC = Highcharts;  // Set Highcharts object
  turnsPS_CO: Highcharts.Options = {};  // Initialize empty chart options
  turnsPS_CD?: {
    categories: string[],
    data: number[]
  };

  constructor() { }

  async ngOnInit() {
    // Fetch turns per speciality data
    this.turnsPD_CD = await this.graphSvc.turnsPerDay();
    

    this.fillTPD();

  }

  fillTPD() {
    // Configure the chart with the data
    this.turnsPD_CO = {
      chart: {
        type: 'line'  // Set chart type to 'column'
      },
      title: {
        text: 'Turns per Speciality'
      },
      xAxis: {
        categories: this.turnsPD_CD?.categories,  // Categories for the x-axis (specialities)
        title: {
          text: 'Speciality'
        }
      },
      yAxis: {
        min: 0,  // Ensure y-axis starts from 0
        title: {
          text: 'Number of Turns'
        },
        tickInterval: 1
      },
      series: [{
        name: 'Turns',
        data: this.turnsPD_CD?.data,
        type: 'line'  // Data (number of turns per speciality)
      }]
    };
  }


}
