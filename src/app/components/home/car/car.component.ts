import { UtlisService } from './../../../services/utlis.service';
import { CarService } from './../../../services/car.service';
import { Component , OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  data : any = {};
  loading : any = {};
  headsTab = ['Marque','Modele' , 'Année de Sortie' , 'Date de creation' , 'Date de modification'];
  metadata : any = {};
  pagination : any = {page : 1, nbBypage : 5}; 

  constructor(
    private carService : CarService , 
    private userService : UserService, 
    private utilsService : UtlisService ,
    private router : Router,
    private utils: UtlisService){}

  YearManufacts(){
    var yearNow = new Date().getFullYear();
    
    var yearBegin = yearNow-100;
    var listYear : any = [];
    
    for (let year = yearNow; year > yearBegin; year--) {
      listYear.push(year);
    }
    return listYear;
 }

  getCars(){
    this.loading.cars = true;
    const success = (cars : any)=>{
      cars.years_of_manufacture = this.YearManufacts();
      this.data.cars = cars;
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

  getUser_cars(){
    this.loading.user_cars = true;
    const success = (user_cars : any)=>{
      this.metadata = user_cars.metadata[0];
      this.data.user_cars = user_cars;
      this.loading.user_cars = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utilsService.checkStatusErr(error.status);
      console.log("error user_cars : ",error.message);
      console.log("status : ",error.status);
      this.loading.user_cars = false;
    }

    this.userService.getUser_cars(this.pagination).subscribe(success, error);
  }

  onAddCar(formAddCar : FormGroup ){
    this.loading.add_car = true;
    delete formAddCar.value.comment;
    console.log(formAddCar.value);
     
    const success = (response : any)=>{
      this.utils.openToastr(response.message , 'Add car user' , 'success');
      this.loading.add_car = false;
      formAddCar.reset();
      this.getUser_cars();
    }

    const error = (error : HttpErrorResponse)=>{
      this.utilsService.checkStatusErr(error.status);
      this.utils.openToastr(error.error.message, 'Add car user' , 'error');
      console.log("error add_car : ",error.message);
      console.log("status : ",error.status);
      this.loading.add_car = false;
    }
    this.userService.addCar_user(formAddCar.value).subscribe(success, error);
  }

  onPageChange(event : PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    console.log(startIndex , endIndex, event.length , event.previousPageIndex);
    this.pagination.nbBypage = endIndex-startIndex;
    this.pagination.page = endIndex/this.pagination.nbBypage;
    this.getUser_cars();
  }

  onDepotCar(carData : any){
    this.router.navigateByUrl('/home/depot-car' , { state : carData});
  }

  ngOnInit(){
    this.getCars();
    this.getUser_cars();
  }
}
