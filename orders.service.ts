import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodItemOrders, Orders } from '../orders/model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  private baseUrl : string = "https://localhost:7194/api/Orders/"

  private baseUrlJunction : string = "https://localhost:7194/api/FoodItemOrders/"

  placeOrder(orderRequest:Orders):Observable<any>{
    return this.http.post<any>(this.baseUrl + "AddOrder", orderRequest);
  }

  addItemDetails(itemRequest:FoodItemOrders):Observable<any>{
    return this.http.post<any>(this.baseUrlJunction + "AddFoodItem", itemRequest);
  }

}
