import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdoptionCreateDto } from '../models/adoption-create.dto';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  private apiUrl = 'http://localhost:8080/api/adoption';

  constructor(private http: HttpClient) {}

  /**
   * Envia os dados da adoção para o backend e retorna o AdoptionDto criado
   */
  createAdoption(adoption: AdoptionCreateDto): Observable<AdoptionCreateDto> {
    return this.http.post<AdoptionCreateDto>(`${this.apiUrl}/create`, adoption);
  }
}
