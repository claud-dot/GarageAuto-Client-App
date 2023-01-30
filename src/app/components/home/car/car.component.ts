import { UtlisService } from './../../../services/utlis.service';
import { CarService } from './../../../services/car.service';
import { Component , OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Subscription } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { OptionComponent } from 'src/app/modal/option/option.component';

declare var $: any;

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  formSearch : FormGroup;
  formCtrlSub : Subscription;
  data : any = {};
  loading : any = {};
  headsTab = [
    { name: 'Marque', value:'mark'},
    { name: 'Modele' , value:'model'},
    { name:  'Date de reparation' , value:'create_at'},
    { name:  'Date de modification' , value : 'update_at'}
  ];
  
  metadata : any = {};
  dataCar : any = {page : 1, nbBypage : 5}; 

  constructor(
    private build: FormBuilder,
    private carService : CarService , 
    private userService : UserService, 
    private utilsService : UtlisService ,
    private router : Router,
    private modalService : NgbModal,
    private utils: UtlisService){}
  
  initForm(){
    this.formSearch = this.build.group({
      filter : new FormControl(null),
      text : new FormControl(null),
      dates : this.build.array([])
    });
    this.initDateInter();
  }

  get dates(): FormArray {
		return this.formSearch.get('dates') as FormArray;
	}

  initDateInter(){
    const formArray = this.dates;
    if(formArray){
      formArray.push(this.build.group({
        start : new FormControl(''),
        end : new FormControl(''),
      }))
    }
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

    this.userService.getUser_cars(this.dataCar).subscribe(success, error);
  }

  onAddCar(formAddCar : FormGroup ){
    this.loading.add_car = true;
    delete formAddCar.value.comment;
     
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

  onDeleteCar(id_car: string){
    this.loading.delete = true;
    const success = (response : any)=>{
      this.utils.openToastr(response.message , "Delete car message" , 'success');
      this.loading.delete = false;
      this.getUser_cars();
    }

    const error = (error : HttpErrorResponse)=>{
      this.utils.openToastr(error.error.message , "Delete car message" , 'error');
      console.log("Delete car "+error.error);
      console.log("status "+error.status);
      this.loading.delete = false;
    }
    this.userService.deleteCar({id_car : id_car}).subscribe(success,error);
  }

  onPageChange(event : PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    this.dataCar.nbBypage = endIndex-startIndex;
    this.dataCar.page = endIndex/this.dataCar.nbBypage;
    this.getUser_cars();
  }

  ngAfterContentInit() {
    this.formCtrlSub = this.formSearch.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
        this.dataCar.page = 1;
        if(!this.formSearch.value['filter']?.includes('_at') && this.formSearch.value['text']!=null){
          this.dataCar.search = value;
          this.getUser_cars();
        }else if(this.utils.isDateValue(value) && this.formSearch.value['filter']?.includes('_at')){
          this.dataCar.search = value;
          this.getUser_cars();
        }
      });
  }

  scrollTo(section : string){
    document.querySelector("#"+section)?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  openDialodg(id_car : string){
    const options : NgbModalOptions  = {
      backdrop : 'static',
      keyboard : false,
      centered: true
    }
    
    const optionModal = this.modalService.open(OptionComponent , options);
    optionModal.componentInstance.dataImage={
      car_user :  id_car
    }
    optionModal.result.then((result : any)=>{
      if(result){
        this.onDeleteCar(id_car);
      }
    })
  }

  onDepotCar(carData : any){
    this.router.navigateByUrl('/home/depot-car' , { state : carData});
  }

  ngOnInit(){
    this.initForm();
    this.getCars();
    this.getUser_cars();
  }
}
