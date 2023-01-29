import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { Form, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UtlisService {

  constructor(private authService : AuthService, private toastr : ToastrService , private router:Router , private storage : StorageService) {

  }

  Login(userData : any , loading : any){
    loading.login = true;
    const success = (user : any)=>{
      this.storage.store('USER_KEY',user);
      loading.login = false;
      if(user.role==='Responsable Financier'){
        this.router.navigate(['home/financier']);
      }else if(user.role==='Responsable Atelier'){
        this.router.navigate(['home/atelier']);
      }else if(user.role==='Client'){
        this.router.navigate(['home']);
      }
    }

    const error = (error : HttpErrorResponse)=>{
      this.openToastr(error.error.message , 'Signin user' , 'error');
      console.log(error);
      loading.login = false;
    }
    this.authService.Login(userData).subscribe(success , error);
  }

  SignUp(userData : any , loading : any){
    loading.signup = true;
    const success = (response : any)=>{
      this.openToastr(response.message , 'Signup user' , 'success');
      loading.signup = false;
      this.router.navigate(['login']);
    }

    const error = (error : HttpErrorResponse)=>{
      this.openToastr(error.error.message , 'Signup user' , 'error');
      this.checkStatusErr(error.status);
      console.log(error);
      loading.signup = false;
    }
    this.authService.SignUp(userData).subscribe(success , error);
  }

  Logout(loading : any){
    const success = (response : any)=>{
      this.openToastr(response.message , 'Logout user' , 'success');
      this.checkStatusErr(401);
      loading.logout = false;
      this.router.navigate(['login']);
    }

    const error = (error : HttpErrorResponse)=>{
      this.openToastr(error.error.message , 'Logout user' , 'error');
      this.checkStatusErr(error.status);
      console.log(error);
      loading.logout = false;
    }
    this.authService.Logout().subscribe(success, error);
  }

  checkStatusErr(statusCode : number){
    if(statusCode == 401 || statusCode == 403){
      this.storage.clear();
    }
  }


  onSubmitForm(formGroup : FormGroup , loading : any , typeSubmit = 'Log'){
      if(typeSubmit=='Log'){
        this.Login(formGroup.value , loading);
      }else{
        this.SignUp(formGroup.value , loading)
      }
  }

  openToastr(message : string, title : string , type : string){
    if(type=='warning'){
      this.toastr.warning(message,title,{
        timeOut : 5000
      });
    }else if(type=='error'){
      this.toastr.error(message,title,{
        timeOut : 5000
      });
    }else if(type=='info'){
      this.toastr.info(message,title,{
        timeOut : 5000
      });
    }else{
      this.toastr.success(message,title,{
        timeOut : 5000
      });
    }
  }

  
  isDateValue(data : any){
    if(data.dates[0].start!='' && data.dates[0].end!=''){
      const start = new Date(data.dates[0].start);
      const end = new Date(data.dates[0].end);
      if (start < end) {
        data.text = null;
        return true;
      }
      return false;
    }else if(data.dates[0].start!='' && data.dates[0].end==''){
      data.text = null;
      return true;
    }else if(data.dates[0].start=='' && data.dates[0].end!=''){
      return false
    }
    return false;
  }
}
