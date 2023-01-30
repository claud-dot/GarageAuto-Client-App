import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    user : any;
    linkApp : any = []; 
    linkClient = [
      { routeLink : '/home', name :  'Home' , icon : 'fa fa-home'},
      { routeLink : 'depot-car', name :  'Depot' , icon : 'fa fa-car'},
      { routeLink : 'repair', name :  'Reparation' , icon : 'fa fa-cogs'},
    ];

    linkAtelier = [
      { routeLink : 'receiveCar', name :  'Réception' , icon : 'fa fa-paper-plane'}
    ];

    linkFinancier = [
      { routeLink : 'financier', name : 'Payment' , icon : 'fa fa-credit-card'},
      { routeLink : 'statistique', name : 'Statistique' , icon : 'fa fa-bar-chart'},
    ]

    loading : any = {};

    constructor(private utils : UtlisService, private authService : AuthService , private storage : StorageService ,private router : Router) {
      this.user = this.storage.get('USER_KEY');
    }

    linkActive(){
      if(this.user.role.toLowerCase()=="client"){
        this.linkApp = this.linkClient;
      }else if(this.user.role.toLowerCase()=="responsable financier"){
        this.linkApp = this.linkFinancier;
      }else if(this.user.role.toLowerCase()=="responsable atelier"){
        this.linkApp = this.linkAtelier;
      }
    }

    LogOut(){
      this.utils.Logout(this.loading);
    }

    checkCookies(){
      this.loading.cookie= true;
      const success = (data : any) =>{
          console.log(data.token);
          this.loading.cookie= false;
      }

      const error = (error :HttpErrorResponse)=>{
          this.storage.removeItem('USER_KEY');
          this.utils.openToastr(error.error , "Server error" , "error");
          this.loading.cookie= false;
          this.router.navigate(['login']);
      }
      this.authService.Cookies().subscribe(success, error);
  }

    ngOnInit(): void {
      this.checkCookies();
      this.linkActive();
    }
}
