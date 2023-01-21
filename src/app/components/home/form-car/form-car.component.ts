import { Component, EventEmitter, Input, Output ,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-form-car',
  templateUrl: './form-car.component.html',
  styleUrls: ['./form-car.component.css']
})
export class FormCarComponent {
  @Input() cars: any = [];
  @Input() loading : boolean;
  @Input() typeForm : string;
  @Output() onSelected = new EventEmitter<any>();

  carForm : FormGroup;
  car_models : string[];
  isValid : boolean = false;

  constructor(private formBuilder : FormBuilder) {}

  initForm(){
    this.carForm = this.formBuilder.group({
       mark : new FormControl(null , Validators.required),
       model : new FormControl(null , Validators.required),
       year_of_manufacture :  new FormControl(null , Validators.required),
       comment : new FormControl(null)
    });
    this.setDefaultFormValue();
  }

  setDefaultFormValue(){
    if(this.cars.isUser){
      this.car_models = this.cars[0].models;
      this.carForm.controls['mark'].setValue(this.cars[0].mark);
      this.carForm.controls['model'].setValue(this.car_models[0]);
      this.carForm.controls['year_of_manufacture'].setValue(this.cars.years_of_manufacture[0]);
      this.carForm.controls['mark'].disable();
      this.carForm.controls['model'].disable();
      this.carForm.controls['year_of_manufacture'].disable();
    }
  }

  onChangeMarkCar(){
    const index = this.cars.findIndex((car : any)=> car.mark === this.carForm.value['mark']);
    if(index!=-1){
      this.car_models = this.cars.find((car : any)=> car.mark === this.carForm.value['mark']).models;
      return;
    }
    this.verifyValueValid();
    this.car_models = [];
    this.carForm.value['model'] = null;
  }

  verifyValueValid(){
    const index_model = this.car_models.findIndex((model : string) => this.carForm.getRawValue().model == model);
    const index_year = this.cars.years_of_manufacture.findIndex((year : any) => this.carForm.getRawValue().year_of_manufacture == year);
    const index = this.cars.findIndex((car : any)=> car.mark === this.carForm.getRawValue().mark);
    const comment_check : string = this.carForm.value['comment']; 
    
    if(this.typeForm=='depot'){
      if(index_model!=-1  && index_year!=-1 && index != -1 && (comment_check!=null && comment_check.trim()!="")) {
        this.isValid =true;
        return
      }
      this.isValid =false;
    }else {
      if(index_model!=-1  && index_year!=-1 && index != -1){
        this.isValid =true;
        return
      }
      this.isValid =false;
    }
  }

  onSubmitForm(){
    if(this.carForm.valid && this.isValid){
      this.onSelected.emit(this.carForm);
      return;
    }
  }

  ngOnInit(){
    this.initForm();
  }
}
