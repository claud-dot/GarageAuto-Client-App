import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component , OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm !: FormGroup;
    hide : boolean = true;
    loading : any = {};
    user_roles : any = {};

    constructor(private formbuild : FormBuilder){}

    initForm(){
      this.loginForm = this.formbuild.group({
        email : new FormControl(null , Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern('.+\\.[a-z]{2,}$')
        ])),
        role : new FormControl(null , Validators.required),
        password : new FormControl(null , Validators.required),
        remember : [null]
      })
    }

    onBlurForm(formName : string , elementId : string){
      var alert = $('#'+elementId).parent();
      if(this.loginForm.get(formName)?.errors && (this.loginForm.get(formName)?.dirty || this.loginForm.get(formName)?.touched)){
        $(alert).addClass('alert-validate');  
      }else{
        $(alert).removeClass('alert-validate');
        $(alert).css('border' , '1px solid #e6e6e6');
      }            
    }

    onSubmitForm(){
      if(this.loginForm.invalid){
        var formInvalid = $('.ng-invalid');
        
        for (const iterator of formInvalid) {
          var idName = $(iterator).attr('id');
          if(idName){
            var parents = $('#'+idName).parent();
            $(parents).css('border' , '1px solid #e84949');
          }
          
        }
      }
    }

    onHidePass(hide : boolean){
        this.hide = !hide;
    }

    onRestForm(){
      this.loginForm.reset();
    }

    ngOnInit(){
      this.initForm();
    }
}
