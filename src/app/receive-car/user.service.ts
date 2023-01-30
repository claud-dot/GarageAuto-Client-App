import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServer = "http://localhost:3000/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getById(id_user : string):Observable<User>{
    return this.httpClient.get<User>(this.apiServer+'user/get/'+id_user);
  }
}
