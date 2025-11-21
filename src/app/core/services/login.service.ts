import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserLogin } from '../models/user-login.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private url : string = 'http://localhost:8080/auth/login'
  private currentUserSubject = new BehaviorSubject<UserLogin | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(private client : HttpClient) {
  }

  login(user : Login) : Observable<UserLogin>{
     return this.client.post<UserLogin>(this.url, user)
        .pipe(
        tap(user =>{
          this.currentUserSubject.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      )
  }

  logout(){
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  get currentUserValue() : UserLogin | null{
    return this.currentUserSubject.value;
  }
}
