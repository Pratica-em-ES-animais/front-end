// core/services/filter.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompatibilityResult } from '../models/compatibilityResult.dto';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private readonly baseUrl = 'http://localhost:8080/api/filter';

  constructor(private http: HttpClient) { }

getCompatiblePets(): Observable<CompatibilityResult[]> {
  return this.http.post<CompatibilityResult[]>(
    'http://localhost:8080/api/filter',
    {},
    {
      withCredentials: true
    }
  );
}

}
