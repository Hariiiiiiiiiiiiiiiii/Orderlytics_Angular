import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  
  registerForm!:FormGroup;

  constructor(private fb: FormBuilder, 
              private appComponent: AppComponent,
              private messageService:MessageService,
              private registerService: RegisterService,
              private router:Router) { }

  ngOnInit():void{
    this.appComponent.showNavigationBar = false;
    this.registerForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
    })
  }
  
   /*
  onRegister() method will check if form data is valid or not
  If form data is valid, register method defined in the service class will get called
  Subscribe will listen to the response received and will invoke the callback function
  If response contains the data, next will be invoked
  If response is error (4xx or 5xx) then, error callback function will be invoked
  Toasts have been used to display the appropriate response to the user in the UI
  */

  onRegister(){
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value)
        .subscribe({
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Registered Successfully' });
        
          const delay = 2000;
          setTimeout(() => {
            this.router.navigate(['login']);  // always takes the absolute path
            }, delay);
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server Error' });
          }
        });
    }
    
    else{
      this.validateAllFormFields(this.registerForm);
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
