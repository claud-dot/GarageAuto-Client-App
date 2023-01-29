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

  constructor(private http : HttpClient , private storage : StorageService) { }

  isLoggedIn(){
    console.log(this.storage.getCookie('garazeAuto-session'));
    
    return this.storage.get('USER_KEY');
  }

  RoleAccess(){
    return this.storage.get('USER_KEY').role;
  }

  Login(userData : any){
    return this.http.post(environment.nodeApi_url+'/auth/signin',userData ,  { headers: environment.header });
  }

  SignUp(userData : any){  
    return this.http.post(environment.nodeApi_url+'/auth/signup' , userData);
  }

  Logout(){
    return this.http.post(environment.nodeApi_url+'/auth/signout',{} , { headers: environment.header });
  }

  Cookies(){
    return this.http.get(environment.nodeApi_url+'/auth/cookies', { observe: 'response',headers: environment.header} );
  }
}
