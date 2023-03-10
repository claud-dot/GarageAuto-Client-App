import { UserService } from './../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UtlisService } from './../../../services/utlis.service';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    utils : any;
    data : any;
    loginForm !: FormGroup;
    hide : boolean = true;
    loading : any = {};
    user_roles : any;

    constructor(
      private formbuild : FormBuilder , 
      private authService : AuthService , 
      private utilService : UtlisService , 
      private userService : UserService){
      this.utils = utilService;
    }

    initForm(){
      this.loginForm = this.formbuild.group({
        email : new FormControl(null , Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern('.+\\.[a-z]{2,}$')
        ])),
        role : new FormControl(null , Validators.required),
        password : new FormControl(null , Validators.required)
      });
      this.loginForm.controls['email'].setValue('claudmja2.0@gmail.com');
      this.loginForm.controls['role'].setValue('Client');
      this.loginForm.controls['password'].setValue('testU7*');
    }

    getRoles(){
      this.loading.role = true;
      const success = (roles : any)=>{
        this.user_roles = roles;
        this.loading.role = false;
      }

      const error = (error : HttpErrorResponse)=>{
        console.log(error.message);
        console.log(error.status);
      }
      this.userService.getUser_roles().subscribe(success , error);
    }

    onHidePass(hide : boolean){
        this.hide = !hide;
    }

    ngOnInit(){
      this.initForm();
      this.getRoles();
    }
}
