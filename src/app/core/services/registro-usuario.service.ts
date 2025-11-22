import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user-model';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login.model';

@Injectable({
  providedIn: 'root'
})


export class RegistroUsuarioService {

  private urlBase : string = 'http://localhost:8080/api/user'
  constructor(private http : HttpClient) { }

  createUser(user : User) : Observable<UserLogin>{
    return this.http.post<UserLogin>(`${this.urlBase}/create`, user);
  }

}
