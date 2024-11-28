import { Component, inject, OnInit } from '@angular/core';
import { GraphsService } from '../../../services/graphs.service';
import { CommonModule } from '@angular/common';

import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-allturnsaskedbyrange',
  standalone: true,
  imports: [HighchartsChartModule, CommonModule, FormsModule],
  templateUrl: './allturnsaskedbyrange.component.html',
  styleUrl: './allturnsaskedbyrange.component.scss'
})
export class AllturnsaskedbyrangeComponent implements OnInit{

  graphSvc = inject(GraphsService);

  Highcharts = Highcharts;  // Set Highcharts object
  chartOptions: Highcharts.Options = {};  // Initialize empty chart options
  chartData?: {
    categories: string[],
    data: number[]
  };

  dateStart?: string;
  dateEnd?: string;

  async ngOnInit() {
    //this.chartData = await this.graphSvc.AllTurnsAskedInRange();
    this.fillTPS();
  }
  
  fillTPS() {
    this.chartOptions = {
      chart: {
        type: 'column'  // Set chart type to 'column'
      },
      title: {
        text: 'Turnos por Doctor'
      },
      xAxis: {
        categories: this.chartData?.categories,  // Categories for the x-axis (specialities)
        title: {
          text: 'Doctores'
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
        type: 'column'  // Data (number of turns per speciality)
      }]
    };
  }

  async loadValues()
  {
    if(this.dateStart && this.dateEnd)
    {
      console.log("entre");
      this.chartData = await this.graphSvc.AllTurnsAskedInRange(this.formatDate(this.dateStart),this.formatDate(this.dateEnd));
      this.fillTPS();
    }
  }

  selectRange()
  {
    this.loadValues();
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return "Invalid date format"; // Handle incorrect input
    }
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  chartInstance: Highcharts.Chart | null = null;

  onChartInstance(chart: Highcharts.Chart) {
    this.chartInstance = chart;  // Save the chart instance
  }

  downloadPDF() {
    if (this.chartInstance) {
      // Cast the chartInstance to Highcharts.Chart to access the exportChart method
      (this.chartInstance as Highcharts.Chart).exportChart(
        {
          type: 'application/pdf',  // Specify the format for PDF
          // Additional exporting options can be added here, like filename, etc.
        },
        this.chartOptions // Pass the chartOptions as the second argument
      );
    } else {
      console.error('Chart instance is not available');
    }
  }  

}
