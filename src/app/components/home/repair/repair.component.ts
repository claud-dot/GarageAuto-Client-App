import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Subscription } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { ImageService } from 'src/app/services/image.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css','../car/car.component.css']
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
  status : any  = [ 
    { name : "En attente de facture" ,value : 0  , class :'status text-danger'},
    { name : "Facture attente de validation" ,value : 1  , class :'status text-warning'},
    { name : "En reparation" ,value :2  , class :'status text-info' },
    { name : "En attente de recuperation" ,value : 3  , class :'status text-success'},
    { name : "Recuperée" ,value : 4  , class : 'text-secondary'},
] 

  constructor(private carService : CarService ,private utils : UtlisService ,  private build: FormBuilder , private imageService: ImageService) {}
  

  getCarRepair(){
    this.loading.cars_repair = true;
    const success = (repairs : any)=>{
      this.metadata = repairs.metadata[0];
      this.imageService.resizeAllImage(repairs.data , 280 , 280);
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

  getAboutStatus(status :number){
    return this.status.find((stat: any)=> stat.value == status);
  }

  onPageChange(event : PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
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
    this.dataRepair.page=1;
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
