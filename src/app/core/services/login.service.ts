import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url : string = 'http://localhost:8080/auth/login'
  constructor(private client : HttpClient) {
  }

  login( user : Login) : Observable<UserLogin>{
      const response = this.client.post<UserLogin>(this.url, user);
      return response;
  }
}
