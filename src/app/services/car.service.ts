import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  constructor(private http : HttpClient) { }

  getCars(){
    return this.http.get(environment.nodeApi_url+'/cars' , {withCredentials: true});
  }

}
