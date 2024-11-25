import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { GraphsService } from '../../../services/graphs.service';

@Component({
  selector: 'app-turnsperday',
  standalone: true,
  imports: [HighchartsChartModule, CommonModule],
  templateUrl: './turnsperday.component.html',
  styleUrl: './turnsperday.component.scss'
})
export class TurnsperdayComponent implements OnInit{

  graphSvc = inject(GraphsService);

  Highcharts = Highcharts;  // Set Highcharts object
  chartOptions: Highcharts.Options = {};  // Initialize empty chart options
  chartData?: {
    categories: string[],
    data: number[]
  };

  async ngOnInit() {

    this.chartData = await this.graphSvc.turnsPerDay();
    

    this.fillTPD();
    
  }

  fillTPD() {
    // Configure the chart with the data
    this.chartOptions = {
      chart: {
        type: 'line'  // Set chart type to 'column'
      },
      title: {
        text: 'Turnos por Día'
      },
      xAxis: {
        categories: this.chartData?.categories,  // Categories for the x-axis (specialities)
        title: {
          text: 'Día'
        }
      },
      yAxis: {
        min: 0,  // Ensure y-axis starts from 0
        title: {
          text: 'Cantidad'
        },
        tickInterval: 1
      },
      series: [{
        name: 'Turnos',
        data: this.chartData?.data,
        type: 'line'  // Data (number of turns per speciality)
      }]
    };
  }

}
