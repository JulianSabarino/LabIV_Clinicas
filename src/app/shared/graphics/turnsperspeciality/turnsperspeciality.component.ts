import { Component, inject, OnInit } from '@angular/core';
import { GraphsService } from '../../../services/graphs.service';

import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turnsperspeciality',
  standalone: true,
  imports: [HighchartsChartModule, CommonModule],
  templateUrl: './turnsperspeciality.component.html',
  styleUrl: './turnsperspeciality.component.scss'
})
export class TurnsperspecialityComponent implements OnInit{

  graphSvc = inject(GraphsService);

  Highcharts = Highcharts;  // Set Highcharts object
  chartOptions: Highcharts.Options = {};  // Initialize empty chart options
  chartData?: {
    categories: string[],
    data: number[]
  };

  async ngOnInit() {
    this.chartData = await this.graphSvc.turnsPerSpeciality();
    this.fillTPS();
  }
  
  fillTPS() {
    this.chartOptions = {
      chart: {
        type: 'column'  // Set chart type to 'column'
      },
      title: {
        text: 'Turns per Speciality'
      },
      xAxis: {
        categories: this.chartData?.categories,  // Categories for the x-axis (specialities)
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
        data: this.chartData?.data,
        type: 'column'  // Data (number of turns per speciality)
      }]
    };
  }

}
