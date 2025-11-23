import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ong } from '../models/ong.model';
import { Observable } from 'rxjs';
import { OngDto } from '../models/ong.dto';

@Injectable({
  providedIn: 'root'
})
export class OngService {
  private urlBase : string = 'http://localhost:8080/api/ong'
  constructor(private httpClient : HttpClient) { }

  createOng(ong : Ong) : Observable<Ong>{
    return this.httpClient.post<Ong>(`${this.urlBase}/create`, ong);
  }

  getAll() : Observable<OngDto[]>{
    return this.httpClient.get<OngDto[]>(this.urlBase);
  }
}
