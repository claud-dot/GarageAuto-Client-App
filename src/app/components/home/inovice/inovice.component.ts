import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InoviceService } from 'src/app/services/inovice.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-inovice',
  templateUrl: './inovice.component.html',
  styleUrls: ['./inovice.component.css']
})
export class InoviceComponent implements OnInit {

  loading : any = {};
  invoice : any;
  id_repair: string;
  user : any;
  author : any;

  constructor(private invoiceService : InoviceService , 
              private router: ActivatedRoute ,
              private userService : UserService, 
              private storage: StorageService, 
              private utils:UtlisService) {
    this.id_repair = this.router.snapshot.params['id_repair'];
    this.author = this.storage.get('USER_KEY');
  }

  getInvoice(){
    this.loading.invoice = true;
    const success = (data : any)=>{
      this.invoice = data.invoice;
      this.user = data.user;
      this.loading.invoice = false;
    }

    const error = (error : HttpErrorResponse)=>{
      console.log(" inovice error "+error.message);
      console.log(" inovice status"+error.status);
      this.utils.openToastr(error.error.message , "Get inovice error" , 'error' )
      this.loading.invoice = false;
    }
    this.invoiceService.getInvoiceRepair(this.id_repair).subscribe(success, error);
  }

  onPay(id_inovice: string){
    const success = (data : any)=>{
      this.invoice = data.invoice;
      this.user = data.user;
      this.loading.invoice = false;
    }

    const error = (error : HttpErrorResponse)=>{
      console.log(" Pay error "+error.message);
      console.log(" Pay status"+error.status);
      this.utils.openToastr(error.error.message , "Pay inovice error" , 'error' )
      this.loading.invoice = false;
    }
    this.invoiceService.payInvoice(id_inovice).subscribe(success, error);
  }

  onValid(id_inovice: string){
    const success = (data : any)=>{
      this.invoice = data.invoice;
      this.user = data.user;
      this.loading.invoice = false;
    }

    const error = (error : HttpErrorResponse)=>{
      console.log(" valid error "+error.message);
      console.log(" valid status"+error.status);
      this.utils.openToastr(error.error.message , "Valid inovice error" , 'error' )
      this.loading.invoice = false;
    }
    this.invoiceService.validPayInvoice(id_inovice).subscribe(success,error);
  }

  ngOnInit(): void {
    this.getInvoice();
  }
}
