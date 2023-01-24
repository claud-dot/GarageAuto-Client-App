import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  constructor(private http : HttpClient , private storage: StorageService) { }

  getCars(){
    return this.http.get(environment.nodeApi_url+'/cars', {withCredentials: true});
  }

  getCar(id_car : string){
    return this.http.get(environment.nodeApi_url+'/car/'+id_car, {withCredentials: true});
  }

  addRepair(dataRepair : any){
    dataRepair.user_id = this.storage.get('USER_KEY').id;
    return this.http.post(environment.nodeApi_url+'/car/repair',dataRepair , {withCredentials : true});
  }


  getUserCarRepair(data : any){
    const user =this.storage.get('USER_KEY');
    data = { user_id : user.id , ...data};
    return this.http.get(environment.nodeApi_url+'/car/user/repair/'+JSON.stringify(data), {withCredentials : true})
  }

  getStoryCarRepair(data : any){
    const user = this.storage.get('USER_KEY');
    data = {user_id : user.id , ...data};
    return this.http.get(environment.nodeApi_url+'/car/user/repair/story/'+JSON.stringify(data) , { withCredentials : true });
  }

}
