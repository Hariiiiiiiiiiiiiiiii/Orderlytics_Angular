import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent {
  constructor(private customerService: CustomersService,
              private messageService: MessageService) { }

  public customers: Customer[] = [];

  // We can fetch the records using API inside ngOnInit method
  // With this when component gets initialized we will have the customer records ready

  // Subscribe method is used to listen to the http response
  // If the API call returns an error status code (e.g., 4xx or 5xx), error callback function is invoked

  ngOnInit(): void {

    this.customerService.getAllCustomers()
      .subscribe({
        next: (customers) => {
          console.log(customers);
          this.customers = customers;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customers fetched successfully' });
        },
        error: (err) => {
          console.log(err.message);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server Error. Try Again' });
        }
      })
  }

  searchText:string = '';

  onSearchTextEntered(event:any) {

    this.searchText = event;
  }

}
