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

  labelsChart = [
    { ref : "jour" , label : ['Lundi' , 'Mardi' , 'Mercredi' ,'Jeudi' , 'Vendredi' , 'Samedi', 'Dimanche'] },
    { ref : "mois" , label : ['Janvier','Fevrier' , 'Mars' , 'Avril' , 'Mais' ,'Juin' ,'Juillet' , 'Août' ,'Septembre' , 'Novembre' ,'Decembre']}
  ];
  
  labels : string[];
  type : string;
  data : any[];

  constructor(private invoiceService : InoviceService , private utils : UtlisService) {
    Chart.register(...registerables);
    Chart.register(annotationPlugin);
  }

  initDataChart(){
    this.labels = this.dataChart.data.labels
    this.type = this.dataChart.type;
    this.data = this.dataChart.data.data;
    console.log(this.dataChart);
    
  }

  barChart(){
    this.initDataChart();
    const labels = this.labels;
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
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
