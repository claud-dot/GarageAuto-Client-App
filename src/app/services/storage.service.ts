import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  store(storageKey : string , data : any) {
    const crypteValue = btoa(escape(JSON.stringify(data)));
    this.removeItem(storageKey);
  	localStorage.setItem(storageKey,crypteValue);
  }
  
  get(storageKey : string){
  	const res = localStorage.getItem(storageKey);
  	if (res) {
  		return JSON.parse(unescape(atob(res)));
  	}else{
  		return false;
  	}
  }

  removeItem(storageKey : string){
  	localStorage.removeItem(storageKey);
  }

  clear(){
  	localStorage.clear();
  }
}
