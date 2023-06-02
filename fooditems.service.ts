import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodItems } from '../orders/model';

@Injectable({
  providedIn: 'root'
})
export class FooditemsService {

  private baseUrl : string = "https://localhost:7194/api/FoodItems/";

  constructor(private http:HttpClient) { }

  getAllFoodItems() : Observable<FoodItems[]>{
    return this.http.get<FoodItems[]>(this.baseUrl + "GetAllFoodItems");
  }

  getFoodItemsById(foodId:string) : Observable<FoodItems>{
    return this.http.get<FoodItems>(this.baseUrl + "GetFoodItemById/" + foodId);
  }

  getFoodItemsByName(itemName:string) : Observable<FoodItems>{
    return this.http.get<FoodItems>(this.baseUrl + "GetFoodItemByName/" + itemName);
  }

  getNumberOfFoodItems(itemName:string) : Observable<any>{
    return this.http.get<FoodItems>(this.baseUrl + "GetNumberOfFoodItems");
  }

  addFoodItems(addFoodItemsRequest : FoodItems) : Observable<any>{
    return this.http.post<any>(this.baseUrl + "AddFoodItem", addFoodItemsRequest);
  }

  updateFoodItems(foodId:string, FoodItem : FoodItems) : Observable<any>{
    return this.http.put<any>(this.baseUrl + "UpdateFoodItem/" + foodId, FoodItem);
  }

  deleteFoodItems(foodId:string) : Observable<any>{
    return this.http.delete<any>(this.baseUrl + "DeleteFoodItem/" + foodId);
  }

}
