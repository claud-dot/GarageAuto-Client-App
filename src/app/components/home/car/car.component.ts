import { UtlisService } from './../../../services/utlis.service';
import { CarService } from './../../../services/car.service';
import { Component , OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  cars : any[];
  loading : boolean = false;

  constructor(private carService : CarService , private utilsService : UtlisService){}

  getCars(){
    const success = (cars : any)=>{
      this.cars = cars;
      this.loading = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utilsService.checkStatusErr(error.status);
      console.log("error : ",error.message);
      console.log("status : ",error.status);
    }

    this.carService.getCars().subscribe(success, error);
  }

  ngOnInit(){
    this.loading = true;
    this.getCars();
  }
}
