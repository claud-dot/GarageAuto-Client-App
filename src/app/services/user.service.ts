import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private storage : StorageService) { }

  getUser_roles(){
    return this.http.get(environment.nodeApi_url+'/user_roles' , {withCredentials : true});
  }

  getUser_cars(){
    const user =this.storage.get('USER_KEY');
    return this.http.get(environment.nodeApi_url+'/user/cars/'+user.id, {withCredentials : true})
  }

  addCar_user(dataCar : any){
    const user =this.storage.get('USER_KEY');
    dataCar.user_id = user.id;
    return this.http.post(environment.nodeApi_url+'/user/add-car',dataCar , { withCredentials : true });
  }
}
