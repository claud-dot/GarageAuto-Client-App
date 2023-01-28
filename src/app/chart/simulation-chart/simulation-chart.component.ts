import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import annotationPlugin from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-simulation-chart',
  templateUrl: './simulation-chart.component.html',
  styleUrls: ['./simulation-chart.component.css']
})
export class SimulationChartComponent implements OnInit {

  @Input() dataChart : any = {};
  
  labels : string[];
  type : string;
  data : any[];

  labelsChart = [
    { ref : "jour" , label : ['Lundi' , 'Mardi' , 'Mercredi' ,'Jeudi' , 'Vendredi' , 'Samedi', 'Dimanche'] },
    { ref : "mois" , label : ['Janvier','Fevrier' , 'Mars' , 'Avril' , 'Mais' ,'Juin' ,'Juillet' , 'Août' ,'Septembre' , 'Novembre' ,'Decembre']}
  ];

  constructor() {
    Chart.register(...registerables);
    Chart.register(annotationPlugin);
  }

  initDataChart(){
    this.labels = this.dataChart.data.labels
    this.type = this.dataChart.type;
    this.data = this.dataChart.data.data;
  }

  simulationChart(){
    this.initDataChart();
    const labels = this.labels;
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Bénefice par chiffre d\'affaire',
          data: this.data,
          borderColor: "transparent",
          backgroundColor:"#ed143dcc",
          borderWidth: 1
        }
      ]
    }

    const config : any= {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
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

    new Chart('simule-chart' , config);
  }

  ngOnInit(): void {
    this.simulationChart();
  }


}
