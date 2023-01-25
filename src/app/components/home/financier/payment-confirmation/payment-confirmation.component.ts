import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CarService } from 'src/app/services/car.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css' , '../../repair/repair.component.css']
})
export class PaymentConfirmationComponent implements OnInit {

  loading : any = {};
  payments : any;
  metadata : any;
  dataPayment : any = {page : 1, nbBypage : 5};

  constructor(private carService : CarService , private utils: UtlisService) {}
 

  getPayements(){
    this.loading.payment = true;
    const success = (repairs : any)=>{
      this.payments = repairs.data;
      this.metadata = repairs.metadata[0];
      this.loading.payment = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utils.openToastr(error.error.message, "Get payment repair" , "error");
      console.log("get payment"+error.message);
      console.log("status "+error.status);
      this.loading.payment = false;
    }

    this.carService.getPayementRepair(this.dataPayment).subscribe(success, error);
  }

  onPageChange(event : PageEvent){
     
  }

  ngOnInit(): void {
      this.getPayements();
  }
}
