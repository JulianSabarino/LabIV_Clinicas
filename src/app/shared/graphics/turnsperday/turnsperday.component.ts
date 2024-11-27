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
        type: 'pie'  // Set chart type to 'pie'
      },
      title: {
        text: 'Turnos por Día'
      },
      series: [{
        name: 'Turnos',
        data: this.chartData?.data.map((item, index) => ({
          name: this.chartData?.categories[index], // Assign date or category to the slice label
          y: item  // The number of turns (value for each slice)
        })),
        type: 'pie'  // Data (number of turns per category)
      }]
    };
  }

}
