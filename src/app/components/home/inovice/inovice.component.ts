import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InoviceService } from 'src/app/services/inovice.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-inovice',
  templateUrl: './inovice.component.html',
  styleUrls: ['./inovice.component.css']
})
export class InoviceComponent implements OnInit {

  loading : any = {};
  inovice : any;
  id_repair: string;
  user : any;

  constructor(private inoviceService : InoviceService , private router: ActivatedRoute , private storage: StorageService, private utils:UtlisService) {
    this.id_repair = this.router.snapshot.params['id_repair'];
    this.user = this.storage.get('USER_KEY');
    console.log(this.user);
    
  }

  getInovice(){
    this.loading.inovice = true;
    const success = (inovice : any)=>{
      this.inovice = inovice;
      this.loading.inovice = false;
    }

    const error = (error : HttpErrorResponse)=>{
      console.log(" inovice error "+error.message);
      console.log(" inovice status"+error.status);
      this.utils.openToastr(error.error.message , "Get inovice error" , 'error' )
      this.loading.inovice = false;
    }
    this.inoviceService.getInoviceRepair(this.id_repair).subscribe(success, error);
  }

  ngOnInit(): void {
    this.getInovice();
  }
}
