import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../customers/customer.model';

/*

Services in Angular are decorated with @Injectable to indicate that the service can be injected as 
a dependency into other components or services.The @Injectable decorator is required for a service class 
to participate in Angular's dependency injection system. It allows Angular to create instances of 
the service, manage their lifecycle, and inject them where they are needed.

*/

@Injectable({
  providedIn: 'root'
})

export class CustomersService {

  private baseUrl : string = "https://localhost:7117/api/Customer/";

  constructor(private http:HttpClient) { }

  getAllCustomers() : Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseUrl + "GetAllCustomers");
  }

  getCustomerById(customerId:string) : Observable<Customer>{
    return this.http.get<Customer>(this.baseUrl + "GetCustomerById/" + customerId);
  }

  getCustomerByPhoneNumber(phoneNumber:number) : Observable<Customer>{
    return this.http.get<Customer>(this.baseUrl + "GetCustomerByPhoneNumber/" + phoneNumber);
  }

  addCustomer(addCustomerRequest : Customer):Observable<any>{
    return this.http.post<any>(this.baseUrl + "AddCustomer", addCustomerRequest);
  }

  updateCustomer(customerId:string, customer : Customer):Observable<any>{
    return this.http.put<any>(this.baseUrl + "UpdateCustomer/" + customerId, customer);
  }

  deleteCustomer(customerId:string):Observable<any>{
    return this.http.delete<any>(this.baseUrl + "DeleteCustomer/" + customerId);
  }

  
}
