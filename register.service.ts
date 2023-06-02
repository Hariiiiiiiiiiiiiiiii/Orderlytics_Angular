import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  private baseUrl : string = "https://localhost:7080/api/Users/register";

  constructor(private http:HttpClient) { }

  register(userObj:any):Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.baseUrl, userObj, httpOptions);
  }
}
