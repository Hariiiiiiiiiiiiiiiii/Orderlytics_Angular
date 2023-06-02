import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from '../customer.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css']
})
export class EditcustomerComponent implements OnInit{

  customerDetails!:Customer;
  
  constructor(private route:ActivatedRoute,
              private router:Router,
              private customerService:CustomersService,
              private messageService:MessageService){}

  // ngOnInit is a perfect place to set up the initialization logic

  ngOnInit(){
    this.route.paramMap.subscribe({
      next: (params) => {
        const customerId = params.get('customerId')

        if(customerId){
          this.customerService.getCustomerById(customerId).
          subscribe({
            next:(customer) =>
            {
              this.customerDetails = customer;
            }
          })
        }
      }
    })
  }


  updateCustomer(){
    this.customerService.updateCustomer(this.customerDetails.customerId, this.customerDetails).
    subscribe({
      next: (customer) => {
        console.log(customer);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer Updated Successfully' });

        const delay = 2000;

        setTimeout(() => {
          this.router.navigate(['customers/customerlist']);
          }, delay);
      },
      error: (err) => {
        console.log(err.message);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server Error' });
      }

    })
  }

  deleteCustomer(){
    this.customerService.deleteCustomer(this.customerDetails.customerId).
    subscribe({
      next: (customer) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer Deleted Successfully' });

        const delay = 2000;

        setTimeout(() => {
          this.router.navigate(['customers/customerlist']);
          }, delay);
      },
      error: (err) => {
        console.log(err.message);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server Error' });
      }
    })

  }



}
