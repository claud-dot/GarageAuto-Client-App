import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { InoviceService } from 'src/app/services/inovice.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() dataChart : any = {};
  
  labels : string[];
  type : string;
  data : any[];

  constructor() {
    Chart.register(...registerables);
    Chart.register(annotationPlugin);
  }

  initDataChart(){
    this.labels = this.dataChart.data.labels
    this.type = this.dataChart.type;
    this.data = this.dataChart.data.data;
  }

  barChart(){
    this.initDataChart();
    const labels = this.labels;
    const data = {
      labels: labels,
      datasets: [{
        label: 'Chiffre d\'affaire',
        data: this.data,
        backgroundColor: '#044c82eb',
        borderColor : 'transparent',
        borderWidth: 1
      }]
    };

    const config : any = {
      type: "bar",
      data: data,
      options: {
        responsive : true,
        scales: {
          y: {
            beginAtZero: true,
          }
        },
        plugins : {
          legend: {
            position: 'top' as const,
            display: false,
          },
          title: {
            display: false,
            text: 'Chart.js Line Chart',
          },
        }
      },
    };

    new Chart("bar-chart", config); 
  }

  ngOnInit(): void {
    this.barChart();
  }

}
