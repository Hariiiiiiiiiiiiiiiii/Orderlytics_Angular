import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  /*
  In TypeScript, the exclamation mark (!) is known as the "definite assignment assertion" operator. 
  It is used to indicate that a class property will be assigned a value later, either in the constructor 
  or somewhere else in the code.
  */

  loginForm!:FormGroup;

  // Constructor is the place where we can inject the dependencies

  constructor(private fb: FormBuilder, 
              private appComponent: AppComponent, 
              private messageService:MessageService,
              private loginService:LoginService,
              private router: Router) { }
  
  // Initialization login can be written in ngOnInit lifecycle hook

  ngOnInit():void{
    this.appComponent.showNavigationBar = false;
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  /*
  onLogin() method will check if form data is valid or not
  If form data is valid, login method defined in the service class will get called
  Subscribe will listen to the response received and will invoke the callback function
  If response contains the data, next will be invoked
  If response is error (4xx or 5xx) then, error callback function will be invoked
  Toasts have been used to display the appropriate response to the user in the UI
  */

  onLogin(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value).    // { username : '', password:''}
      subscribe({
        next: (admin) => {
          
          localStorage.setItem('token',JSON.stringify(admin));
          
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful' });
        
          const delay = 1200;  // adding some delay in the routing
          setTimeout(() => {
            this.router.navigate(['dashboard']);  // always takes to the absolute path
            }, delay);
        },
        error: (error) => {

          if (error.status === 404) {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not found' });
          } else if (error.status === 500) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal server error' });
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal server error' });
          }
        }
      })
    }
    else{
      this.validateAllFormFields(this.loginForm);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Form Details' });
      }
    }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })
  }
  
}
