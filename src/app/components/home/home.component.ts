import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UtlisService } from 'src/app/services/utlis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    loading : any = {};

    constructor(private utils : UtlisService) {}

    LogOut(){
      this.utils.Logout(this.loading);
    }
}
