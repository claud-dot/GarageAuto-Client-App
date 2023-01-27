import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InoviceService {

  constructor(private http : HttpClient) { }

  getInvoiceRepair(id_inovice : string){
     return this.http.get(environment.nodeApi_url+"/invoice/repair/"+id_inovice , { withCredentials: true });
  }

  payInvoice(inovice: any){
    return this.http.put(environment.nodeApi_url+"/invoice/pay", inovice , { withCredentials: true });
  }

  validPayInvoice(inovice: any){
    return this.http.put(environment.nodeApi_url+"/invoice/pay/valid",inovice , { withCredentials: true });
  }
}
