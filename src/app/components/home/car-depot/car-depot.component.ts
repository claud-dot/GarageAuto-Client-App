import { HttpErrorResponse } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-car-depot',
  templateUrl: './car-depot.component.html',
  styleUrls: ['./car-depot.component.css']
})
export class CarDepotComponent implements OnInit {
  loading : any = {};
  cars : any = [];
  dataSendRoute : any;

  constructor(
      private carService : CarService , 
      private utilsService : UtlisService ,
      private utils: UtlisService){   
        this.dataSendRoute = window.history.state;
  }

  YearManufacts(){
    var yearNow = new Date().getFullYear();
    
    var yearBegin = yearNow-100;
    var listYear : any = [];
    
    for (let year = yearNow; year > yearBegin; year--) {
      listYear.push(year);
    }
    return listYear;
 }

 isStory(){
  let i = 0;
  for (const key in this.dataSendRoute) {
    i++;
  }
  return i>1;
 }

  getCars(){
    this.loading.cars = true;
    const success = (cars : any)=>{
      cars.years_of_manufacture = this.YearManufacts();
      cars.isUser = false;
      this.cars = cars;
      this.loading.cars = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utilsService.checkStatusErr(error.status);
      console.log("error cars : ",error.message);
      console.log("status : ",error.status);
      this.loading.cars = false;
    }

    this.carService.getCars().subscribe(success, error);
  }

  onDepotCar(formAddCar : FormGroup){
    this.loading.depot_car = true;
    const success = (response : any)=>{
      this.utils.openToastr(response.message , 'Add car user' , 'success');
      this.loading.depot_car = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utilsService.checkStatusErr(error.status);
      this.utils.openToastr(error.error.message, 'Add car user' , 'error');
      console.log("error depot_car : ",error.message);
      console.log("status : ",error.status);
      this.loading.depot_car = false;
    }
    this.carService.addRepair(formAddCar.getRawValue()).subscribe(success, error);
  }

  initData(){
    if(this.isStory()){
      const dataBuild : any = [
        {
          mark : this.dataSendRoute.mark,
          models : [this.dataSendRoute.model],
        }
      ]
      dataBuild. years_of_manufacture = [this.dataSendRoute.year_of_manufacture];
      dataBuild.isUser = true;
      console.log("user_car exist");
      
      this.cars = dataBuild;
    }else{
      this.getCars();
    }
  }

  ngOnInit(){
    this.initData();
  }
}
