import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private htttp : HttpClient) { }

  Login(userData : any){
    return this.htttp.post(environment.nodeApi_url+'/auth/signin',userData ,  { headers: environment.header });
  }

  SignUp(userData : any){
    console.log(environment.nodeApi_url+'/auth/signup',userData ,  { headers: environment.header });  
    return this.htttp.post(environment.nodeApi_url+'/auth/signup' , userData);
  }

  Logout(){
    return this.htttp.post(environment.nodeApi_url+'/auth/logout',{} , { headers: environment.header });
  }
}
