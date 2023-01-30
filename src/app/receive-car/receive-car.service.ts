import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Repair} from './repair';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class ReceiveCarService {

  private apiServer = "http://localhost:3000/cars/repairRequest/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAll():Observable<Repair[]>{
    return this.httpClient.get<Repair[]>(this.apiServer+'list');
  }

  getUserById(id_user : string):Observable<User>{
    return this.httpClient.get<User>(this.apiServer+'/user/get/'+id_user);
  }
}
