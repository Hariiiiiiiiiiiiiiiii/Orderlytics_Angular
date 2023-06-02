import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer.model';
import { MessageService } from 'primeng/api';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent {
  addCustomerRequest : Customer = {
    customerId : '',
    customerFirstName: '',
    customerLastName: '',
    customerEmail: '',
    customerPhoneNumber:0
  }

  constructor(private customerService: CustomersService,
              private router: Router,
              private messageService: MessageService){}

  addCustomer(){
    this.customerService.addCustomer(this.addCustomerRequest).
    subscribe({
      next: (customer) => {
        console.log(customer);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer Added Successfully' });

        const delay = 3000;

        setTimeout(() => {
          this.router.navigate(['customers']);
          }, delay);
      },
      error: (err) => {
        console.log(err.message);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server Error' });
      }
    })
  }


}
