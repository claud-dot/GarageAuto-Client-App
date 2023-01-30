import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export interface Comment{
  description:string,
  qt:Number,
  unit_price:number,
  montant:number
}

export interface Invoice{
  results_comment:Comment[],
  repair_id:string,
  duration:number,
  unit_duration:number,
  status:number
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiServer = "http://localhost:3000/invoice/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getPdf(myInvoice:Invoice):Observable<any>{
    return this.httpClient.post(this.apiServer+'getPDF',myInvoice);
  }

  create(myInvoice:Invoice):Observable<any>{
    return this.httpClient.post(this.apiServer+'send',myInvoice);
  }

}
