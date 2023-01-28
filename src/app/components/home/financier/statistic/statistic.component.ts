import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { UtlisService } from 'src/app/services/utlis.service';

declare var $ : any;

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  formCtrlSub : Subscription;
  barFormSub : Subscription;
  simuleFormSub : Subscription;
  addBtn : string = "Global";

  modelMark : string[];
  listSimule : any = [];
  loading : any = {};

  lineForm : FormGroup;
  barForm : FormGroup;
  simuleForm : FormGroup;
  simuleTypeForm : FormGroup;

  months : string[] = ['Janvier' , 'Février' ,'Mars' , 'Avril' , 'Mai' ,'Juin' ,'Juillet' , 'Aôut' , 'Septembre' , 'Octobre' , 'Novembre' , 'Décembre'];
  monthtsFilter: string[];
  inputSimule :any[] = [
    {name : "Salaire" , value : 'salary' , place : "salaire"},
    {name : "Loyer" , value : 'rent' , place : "loyer"},
    {name : "Piece" , value : 'piece' , place : "achats des pèice"},
    {name : "Autres" , value : 'other' , place : "autres dépenses"},
  ]

  dataLineChart : any = { mark : "" , model : "" };
  dataBarChart : string = "null" ;
  dataSimulChart : any = {
    data : { salary : 0 , rent : 0 ,piece : 0 ,other : 0, mont : "" },
    choice : "global"
  };

  dataSimulStat : any = { label : "Montant simuler en Ar", type : "bar" }
  dataLineStat : any = { label : "Nombre de jour", type : "line", };
  dataBarStat : any = {  label : "Montant en Ar", type : "bar" };

  constructor(private carService : CarService , public userService: UserService , private utils : UtlisService , private build:FormBuilder) {}

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

  initSimuleForm(){
    this.simuleForm = this.build.group({
      salary : new FormControl(null , [ Validators.min(0), Validators.required]),
      rent : new FormControl(null , [Validators.min(0), Validators.required]),
      piece : new FormControl(null , [Validators.min(0), Validators.required]),
      other : new FormControl(null , [Validators.min(0), Validators.required]),
      month : new FormControl("")
    });
  }

  initSimuleTypeForm(){
    this.simuleTypeForm = this.build.group({
      choice : new FormControl('')
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

  getBenefice(){
    this.loading.simulation = true;
    const success = (data : any)=>{
      this.dataSimulStat.data = data.dataStat;
      console.log(data);
      
      this.loading.simulation = false;
      $('.collapse').collapse('hide');
      this.listSimule =[];
    }

    const error = (error : HttpErrorResponse)=>{
      this.utils.openToastr( error.error , " Simulation Statistique" ,"error");
      console.log("Simulation stat : "+error.error);
      console.log(" Simulation status : "+error.status);
      this.loading.simulation = false;
    }
    this.userService.getSimulationStat(this.dataSimulChart).subscribe(success, error);
  }

  ngAfterContentInit() {
    this.formCtrlSub = this.lineForm.valueChanges.pipe(debounceTime(500)).subscribe(value => {
          if(value.mark.trim()!=""){
            this.modelMark = this.dataLineStat.cars.find((car : any)=>car.mark ==value.mark).models;
            const indexModelValue = this.modelMark.findIndex((model : any)=>model ==value.model);
            if(indexModelValue==-1) value.model = "";
          }
          this.dataLineChart = value;
          this.getRepairStat();
      });

    this.barFormSub = this.barForm.valueChanges.pipe(debounceTime(500)).subscribe(value =>{
        this.dataBarChart = value.unit_duration; 
        this.getTurnover();
    });

    this.simuleFormSub = this.simuleTypeForm.valueChanges.pipe(debounceTime(200)).subscribe(value =>{
        $('.collapse').collapse('hide');
        this.addBtn = value.choice;
        this.simuleForm.reset();
        this.listSimule =[];
        if(this.addBtn=='Mois') {
          this.simuleForm.reset();
          this.formReset();
        }
    });
  }

  onSimule(){
    if(this.simuleTypeForm.value['choice']!="Mois"){
      this.dataSimulChart.data= this.simuleForm.value;
      this.dataSimulChart.choice = "global";
      this
    }else{
      this.dataSimulChart.data = this.listSimule;
      this.dataSimulChart.choice = "mois";
      $('.collapse').collapse('hide');
      this.listSimule =[];
    }
    this.getBenefice();
    console.log(this.dataSimulChart);
    this.formReset();
  }

  onAddSimule(){
    $('.collapse').collapse('show');
    this.listSimule.push(this.simuleForm.value);
    this.formReset();
  }

  formReset(){
    this.simuleForm.reset();
    this.monthtsFilter = this.months;
    let listMonthSimule : string[]= [];
    for (let simul of this.listSimule) {
      listMonthSimule.push(simul.month);
    }
    this.monthtsFilter =this.monthtsFilter.filter((val : string) => !listMonthSimule.includes(val));
    this.simuleForm.controls['month'].setValue(this.monthtsFilter[0]);
  }

  onDeleteSimule(index: number){
    this.listSimule.splice(index , 1);
    if(this.listSimule.length<=0){
      $('.collapse').collapse('hide');
    }
    this.formReset();
  }

  scrollTo(section : string){
    document.querySelector("#"+section)?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  ngOnInit(): void {
    this.initSimuleTypeForm();
    this.initLineForm();
    this.initBarForm();
    this.initSimuleForm();
    this.getRepairStat();
    this.getCars();
    this.getTurnover();
    this.getBenefice();
  }
}
