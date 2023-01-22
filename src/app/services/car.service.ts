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

  addRepair(dataRepair : any){
    dataRepair.user_id = this.storage.get('USER_KEY').id;
    return this.http.post(environment.nodeApi_url+'/car/repair',dataRepair , {withCredentials : true});
  }


  getUserCarRepair(dataPage : any){
    const user =this.storage.get('USER_KEY');
    return this.http.get(environment.nodeApi_url+'/car/user/repair/'+user.id+'/'+dataPage.page+'/'+dataPage.nbBypage, {withCredentials : true})
  }

}
