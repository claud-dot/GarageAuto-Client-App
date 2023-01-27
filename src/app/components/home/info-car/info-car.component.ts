import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-info-car',
  templateUrl: './info-car.component.html',
  styleUrls: ['./info-car.component.css']
})
export class InfoCarComponent implements OnInit {

  filterForm : FormGroup;
  car_id : string;
  data : any = {};
  loading : any = {};
  dataStory : any = {page : 1, nbBypage : 5 , status : "null"};
  metadata : any = {} ; 
  status : any  = [ 
      { name : "En attente de facture" ,value : 0  , class :'status text-danger'},
      { name : "Facture attente de validation" ,value : 1  , class :'status text-warning'},
      { name : "En reparation" ,value :2  , class :'status text-info' },
      { name : "En attente de recuperation" ,value : 3  , class :'status text-success'},
      { name : "Recuperée" ,value : 4  , class : 'text-secondary'},
  ]

  constructor(private carService :  CarService , private utilsService: UtlisService , private router : ActivatedRoute , private build : FormBuilder) {
    this.car_id = this.router.snapshot.params['id_car']
    this.dataStory = { car_id : this.car_id , ...this.dataStory };
  }

  initForm(){
    this.filterForm = this.build.group({
      status : new FormControl('Tous *')
    });
  }

  onPageChange(event : PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    console.log(startIndex , endIndex, event.length , event.previousPageIndex);
    this.dataStory.nbBypage = endIndex-startIndex;
    this.dataStory.page = endIndex/this.dataStory.nbBypage;
    this.getStoryRepairCar();
  }

  onFilterStory(){
    const statusValue = this.filterForm.value['status'];
    const index = this.status.findIndex((status : any) => status.value == statusValue );
    index !=-1 ? this.dataStory.status = statusValue : this.dataStory.status = "null";
    this.getStoryRepairCar();
  }

  getStoryRepairCar(){
    this.loading.story = true;
    const success = (story : any)=>{
      this.metadata =story.metadata[0];
      console.log(this.metadata);
      
      this.data.story = story.data;
      this.loading.story = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utilsService.checkStatusErr(error.status);
      console.log("error story : ",error.message);
      console.log("status : ",error.status);
      this.loading.story = false;
    }
    this.carService.getStoryCarRepair(this.dataStory).subscribe(success,error);
  }

  getAboutStatus(status :number){
    return this.status.find((stat: any)=> stat.value == status);
  }

  getCarDetails(){
    this.loading.car = true;
    const success = (car : any)=>{
      this.data.car = car;
      console.log(car);
      
      this.loading.car = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utilsService.checkStatusErr(error.status);
      console.log("error car : ",error.message);
      console.log("status : ",error.status);
      this.loading.car = false;
    }
    this.carService.getCar(this.car_id).subscribe(success,error)
  }


  ngOnInit(): void {
    this.initForm();
    this.getCarDetails();
    this.getStoryRepairCar();
  }
}
