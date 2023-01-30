import { Component, OnInit } from '@angular/core';
import {Repair} from '../repair';
import {ReceiveCarService} from '../receive-car.service';
import { ActivatedRoute, Router} from '@angular/router'
import { FormControl, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receive-car-list',
  templateUrl: './receive-car-list.component.html',
  styleUrls: ['./receive-car-list.component.css', '../../components/home/car/car.component.css']
})
export class ReceiveCarListComponent implements OnInit {
  repairs:Repair[]=[];
  formSearch : FormGroup;
  formCtrlSub : Subscription;

  constructor(public receiveCarService:ReceiveCarService,private router: Router , private build : FormBuilder){}
  
  navigateToInvoice(id_user : string , id_repair: string){
    this.router.navigate(['/home/facture/create'],  { queryParams: { user_id : JSON.stringify(id_user) , repar_id : JSON.stringify(id_repair) } });
  }

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

  ngOnInit(){
    // this.initForm();
    this.receiveCarService.getAll().subscribe((data:Repair[])=>{
      console.log(data);
      this.repairs=data;
    },
    ); 
  }
}
