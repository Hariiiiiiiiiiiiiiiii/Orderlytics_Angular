import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private baseUrl : string = "https://localhost:7080/api/Users/";

  constructor(private http:HttpClient) { }

  login(userObj:any):Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let result = this.http.post<any>(this.baseUrl + 'authenticate', userObj, httpOptions);
    console.log(result);
    return result;
  }
}





