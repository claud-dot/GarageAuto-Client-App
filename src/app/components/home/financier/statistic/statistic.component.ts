import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  formCtrlSub : Subscription;
  barFormSub : Subscription;
  modelMark : string[];
  loading : any = {};
  lineForm : FormGroup;
  barForm : FormGroup;
  dataLineChart : any = { mark : "" , model : "" };
  dataBarChart : string = "null" ;
  dataLineStat : any = {
      label : "Nombre de jour",
      type : "line", 
  };
  dataBarStat : any = {
    data : [] ,
    label : "Nombre de jour",
    type : "line", 
  };

  constructor(private carService : CarService , private utils : UtlisService , private build:FormBuilder) {}

  initLineForm(){
    this.lineForm = this.build.group({
        mark : new FormControl(""),
        model : new FormControl("")
    })
  }

  initBarForm(){
    this.barForm = this.build.group({
        unit_duration : new FormControl("") 
    })
  }

  getRepairStat(){
    this.loading.stat_repair =true;
    const success = (data : any)=>{
      this.dataLineStat.data= data;
      this.loading.stat_repair =false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utils.openToastr( error.error , " Statistique repair" ,"error");
      console.log("Stat error "+error.message);
      console.log("Status stat error "+error.status);
      this.loading.stat_repair =false;
    }

    this.carService.getRepairStat(this.dataLineChart).subscribe(success , error);
  }

  getCars(){
    this.loading.cars = true;
    const success = (data : any)=>{
      this.dataLineStat.cars = data;
      this.loading.cars = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utils.openToastr(error.error , 'Get car error', 'error');
      this.loading.cars = false;
      console.log("Error "+error.error);
      console.log(" Status "+error.status);
    }
    this.carService.getCars().subscribe(success, error);
  }

  getTurnover(){
    this.loading.stat_turnover = true;
    const success = (data : any)=>{
      console.log(data.dataStat);
      
      this.dataBarStat.data = data.dataStat;
      this.loading.stat_turnover = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utils.openToastr( error.error , " Statistique Amount" ,"error");
      console.log("Amount stat : "+error.error);
      console.log(" Amount status : "+error.status);
      this.loading.stat_turnover = false;
    }
    this.carService.getTurnoverStat(this.dataBarChart).subscribe(success, error);
  }

  ngAfterContentInit() {
    this.formCtrlSub = this.lineForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
          if(value.mark.trim()!=""){
            this.modelMark = this.dataLineStat.cars.find((car : any)=>car.mark ==value.mark).models;
            const indexModelValue = this.modelMark.findIndex((model : any)=>model ==value.model);
            if(indexModelValue==-1) value.model = "";
          }
          this.dataLineChart = value;
          this.getRepairStat();
      });

    this.barFormSub = this.barForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value =>{
        this.dataBarChart = value.unit_duration; 
        this.getTurnover();
    })
  }

  ngOnInit(): void {
    this.initLineForm();
    this.initBarForm();
    this.getRepairStat();
    this.getCars();
    this.getTurnover();
  }
}
