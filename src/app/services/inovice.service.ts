import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InoviceService {

  constructor(private http : HttpClient) { }

  getInoviceRepair(id_inovice : string){
     return this.http.get(environment.nodeApi_url+"/inovice/repair/"+id_inovice , { withCredentials: true });
  }
}
