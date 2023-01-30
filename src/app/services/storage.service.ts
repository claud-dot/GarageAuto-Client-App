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

  getCookie(cname : string) {
    let name = cname + "=";
    console.log(document.cookie);
    let decodedCookie = decodeURIComponent(document.cookie);
    
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
