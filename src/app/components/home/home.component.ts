import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
      { routeLink : '', name :  'Home' , icon : 'fa fa-home'},
      { routeLink : 'depot-car', name :  'Depot' , icon : 'fa fa-home'},
      { routeLink : 'repair', name :  'Reparation' , icon : 'fa fa-cogs'},
    ];

    linkAtelier = [
      { routeLink : '', name :  '' , icon : ''},
      { routeLink : '', name :  '' , icon : ''},
      { routeLink : '', name :  '' , icon : ''},
    ];

    linkFinancier = [
      { routeLink : 'financier', name : 'Payment' , icon : 'fa fa-credit-card'},
      { routeLink : 'statistique', name : 'Statistique' , icon : 'fa fa-bar-chart'},
    ]

    loading : any = {};

    constructor(private utils : UtlisService , private storage : StorageService) {
      this.user = this.storage.get('USER_KEY');
    }

    linkActive(){
      console.log(this.user , "jbjbjbj");
      
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

    ngOnInit(): void {
      this.linkActive();
    }
}
