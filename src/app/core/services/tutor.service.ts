import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tutor } from '../models/tutor-model';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private urlBase : string = 'http://localhost:8080/api/tutor';

  constructor(private httpClient : HttpClient) {
    
  }

  create(tutor : Tutor) : Observable<UserLogin>{
    return this.httpClient.post<UserLogin>(`${this.urlBase}/create`, tutor);
  }
}
