import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getUser_roles(){
    return this.http.get(environment.nodeApi_url+'/user_roles' , { headers : environment.header });
  }
}
