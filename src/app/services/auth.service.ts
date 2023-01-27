import { StorageService } from './storage.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public roleUrl = [
    { role : "Client", urlDefault :  'home'},
    { role : "Responsable Financier" , urlDefault : "home/financier"},
    { role : "Responsable Atelier" , urlDefault : "home/atelier"},
  ]

  constructor(private htttp : HttpClient , private storage : StorageService) { }

  isLoggedIn(){
    return this.storage.get('USER_KEY');
  }

  RoleAccess(){
    return this.storage.get('USER_KEY').role;
  }

  Login(userData : any){
    return this.htttp.post(environment.nodeApi_url+'/auth/signin',userData ,  { headers: environment.header });
  }

  SignUp(userData : any){  
    return this.htttp.post(environment.nodeApi_url+'/auth/signup' , userData);
  }

  Logout(){
    return this.htttp.post(environment.nodeApi_url+'/auth/signout',{} , { headers: environment.header });
  }
}
