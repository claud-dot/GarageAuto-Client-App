import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {
  repairs : any;
  loading : any = {};
  dataRepair : any = {page : 1, nbBypage : 5}; 
  metadata : any = {};
  formSearch : FormGroup;
  formCtrlSub : Subscription;

  headsTab = [
    { name: 'Marque', value:'mark'},
    { name: 'Modele' , value:'model'},
    { name:  'Date de reparation' , value:'create_at'},
  ];
  status = [
    { name : "En attent de facture" , value : 0},
    { name : "En reparation" , value : 1},
    { name : "En attent de recuperation" , value : 2},
    { name : "Recuperé" , value : 3}
  ] 

  constructor(private carService : CarService ,private utils : UtlisService ,  private build: FormBuilder) {}
  

  getCarRepair(){
    this.loading.cars_repair = true;
    const success = (repairs : any)=>{
      this.metadata = repairs.metadata[0];
      this.repairs = repairs;
      this.loading.cars_repair = false;
    }

    const error = (error :  any)=>{
      this.utils.checkStatusErr(error.status);
      console.log("repair "+error.message);
      this.loading.cars_repair = false;
    }

    this.carService.getUserCarRepair(this.dataRepair).subscribe(success, error);
  }

  getStatusRepair(status : number){
    if(status == 0){
      return "En attente de facture";
    }else if(status == 1){
      return "En reparation";
    }else {
      return "Recuperé";
    }
  }

  onPageChange(event : PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    console.log(startIndex , endIndex, event.length , event.previousPageIndex);
    this.dataRepair.nbBypage = endIndex-startIndex;
    this.dataRepair.page = endIndex/this.dataRepair.nbBypage;
    this.getCarRepair();
  }

  initForm(){
    this.formSearch = this.build.group({
      filterStatus : new FormControl(null),
      filterCar : new FormControl(null),
      text : new FormControl(null),
      date : new FormControl(null)
    });
  }

  ngAfterContentInit() {
    this.formCtrlSub = this.formSearch.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
        this.checkValue(value);
        this.dataRepair.search = value;
        console.log(value);
        this.getCarRepair();
    });
  }

  checkValue(value : any){
    if(value){
      if(value.filterCar?.includes('_at')){
        value.text = null;
      }else{
        value.date = null;
      }
      
      if(value.filterStatus=='null'){
        value.filterStatus=null;
      }
    }
  }

  ngOnInit(): void {
      this.initForm();
      this.getCarRepair();
  }
}
