import { UtlisService } from './../../../services/utlis.service';
import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm !: FormGroup;
  hide : any = [];
  loading : any = {};
  user_role : any;
  utils : any;

  constructor(private formbuild : FormBuilder , private utilService : UtlisService , private userService : UserService){
    this.utils = utilService;
  }

  initForm(){
    this.signUpForm = this.formbuild.group({
        username : new FormControl(null , Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
        email : new FormControl(null , Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern('.+\\.[a-z]{2,}$')
        ])),
        role : new FormControl(null , Validators.required),
        password : new FormControl( null , Validators.compose([
            Validators.required,
            Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/)
        ]))
    })
  }

  onHidePass(hide : boolean){
    this.hide = !hide;
  }
  initHide(){
      this.hide.pass = true;
      this.hide.confirm = true;
  }

  getRoles(){
    this.loading.role = true;
    const success = (roles : any)=>{
      this.user_role = roles;
      this.signUpForm.controls['role'].setValue(roles[0].role);
      this.loading.role = false;
    }

    const error = (err : HttpErrorResponse)=>{
      this.utils.openToastr(err.error.message , "Role user" , 'error');
      console.log("roles "+err.error.message);
      this.loading.role = false;
    }
    this.userService.getUser_roles().subscribe(success,error);
  }

  ngOnInit(){
    this.getRoles();
    this.initHide();
    this.initForm();
  }
}

