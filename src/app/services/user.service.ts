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

  getUser_cars(data : any){
    const user =this.storage.get('USER_KEY');
    data = {user_id : user.id , ...data};
    return this.http.get(environment.nodeApi_url+'/user/cars/'+JSON.stringify(data), {withCredentials : true})
  }

  getUser_repair(id_repair : string){
    return this.http.get(environment.nodeApi_url+'/user/repair/'+id_repair , { withCredentials: true });
  }

  addCar_user(dataCar : any){
    const user =this.storage.get('USER_KEY');
    dataCar.user_id = user.id;
    return this.http.post(environment.nodeApi_url+'/user/add-car',dataCar , { withCredentials : true });
  }

  getSimulationStat(dataSimulation : any){
    return this.http.get(environment.nodeApi_url+"/user/simulate/"+JSON.stringify(dataSimulation) , { withCredentials: true });
  }

}
