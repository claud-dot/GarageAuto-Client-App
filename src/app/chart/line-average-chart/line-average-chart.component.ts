import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chart , registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
// import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-average-chart',
  templateUrl: './line-average-chart.component.html',
  styleUrls: ['./line-average-chart.component.css'] 
})
export class LineAverageChartComponent implements OnInit {
  
  @Input() dataChart : any;
  @Input() loading : any = {};
  
  chartData: any[];
  chartType : string;

  constructor() {
    Chart.register(...registerables);
    Chart.register(annotationPlugin);
  }

  initDataChart(){
    this.chartData = [
      { 
        data: this.dataChart.data.durations, 
        label: this.dataChart.label,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1 
      }
    ];
    this.chartType = this.dataChart.type;
  }
  
  average(ctx : any) {
    const values = ctx.chart.data.datasets[0].data;
    return values.reduce((a : number, b : number) => a + b, 0) / values.length;
  }


  lineChart(){
    this.initDataChart();
    const annotation : any = {
      type: 'line',
      borderColor: 'green',
      borderDash: [6, 6],
      borderDashOffset: 0,
      borderWidth: 2,
      label: {
        enabled: true,
        position: 'end',
        content: (ctx : number) => 'Moyenne : ' + this.average(ctx).toFixed(2)+" jour(s)",
      },
      scaleID: 'y',
      value: (ctx : number) => this.average(ctx)
    };

    const DATA_COUNT = this.chartData[0].data.length;

    const labels : any = [];
    for (let i = 0; i < DATA_COUNT; ++i) {
      labels.push('' + i);
    }

    const data : any = {
      labels: labels,
      datasets: this.chartData
    };
    
    const config : any = {
      type: this.chartType,
      data,
      options: {
        responsive: true,
        plugins: {
          annotation: {
            annotations: {
              annotation
            }
          },
          legend: {
            position: 'top' as const,
            display: false,
          },
          title: {
            display: false,
            text: 'Chart.js Line Chart',
          },
        }
      }
    };  
    new Chart("line-chart",config);
  }
  
  ngOnInit(): void {
    this.lineChart();
  }
}

