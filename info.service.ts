import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpEvent} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  readonly apiUrl = 'https://localhost:7122/api/';    
  
  constructor(private http: HttpClient) { }    
    
  getTotalCustomers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Customer/GetNumberOfCustomers');   
  } 

  getTotalFoodItems(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'FoodItems/GetNumberOfFoodItems');   
  } 
}
