import { Component } from '@angular/core';
import {Repair} from '../repair';
import {ReceiveCarService} from '../receive-car.service';
import { ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-receive-car-list',
  templateUrl: './receive-car-list.component.html',
  styleUrls: ['./receive-car-list.component.css']
})
export class ReceiveCarListComponent {
  repairs:Repair[]=[];
  constructor(public receiveCarService:ReceiveCarService,private router: Router){}
  
  ngOnInit(){
    this.receiveCarService.getAll().subscribe((data:Repair[])=>{
      console.log(data);
      this.repairs=data;
    },
    ); 
  }
  navigateToInvoice(){
    this.router.navigate(['/home/invoice/create']);
  }
}
