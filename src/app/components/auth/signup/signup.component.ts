import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm !: FormGroup;
  hide : any = [];
  loading : any = {};
  user_role : any = {};

  constructor(private formbuild : FormBuilder){}

  initForm(){
    this.signUpForm = this.formbuild.group({
        name : new FormControl(null , Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
        lastname : new FormControl(null , Validators.compose([
           Validators.required , 
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
            Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/),
            Validators.minLength(6)
        ])),
        confirm : new FormControl(null,Validators.required)
    })
  }

  onchangeClass(formName : string){
      if(this.signUpForm.get(formName)?.valid){
          return 'form-control is-valid';
      }else if(this.signUpForm.get(formName)?.errors && (this.signUpForm.get(formName)?.dirty || this.signUpForm.get(formName)?.touched)){
          //this.errorStyle = true;
          return 'form-control is-invalid';
      }else{
          return 'form-control';
      }            
  }

  initHide(){
      this.hide.pass = true;
      this.hide.confirm = true;
  }

  ngOnInit(){
    this.initHide();
    this.initForm();
  }
}

