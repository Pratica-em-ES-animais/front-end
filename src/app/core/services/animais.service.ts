import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { AnimalCreateDto } from '../models/animal-create.dto';

@Injectable({ providedIn: 'root' })
export class AnimaisService {

  private apiUrl = 'http://localhost:8080/api/animal';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/pets`);
  }

  createAnimal(animal: AnimalCreateDto): Observable<Animal> {
    return this.http.post<Animal>(`${this.apiUrl}/create`, animal);
  }

  uploadPhoto(animalId: string, file: File): Observable<{
    filename: string;
    url: string;
    message: string;
  }> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<{
      filename: string;
      url: string;
      message: string;
    }>(
      `${this.apiUrl}/upload-photo/${animalId}`,
      formData
    );
  }

  getPhotoUrl(filename: string): string {
    return `${this.apiUrl}/photo/${filename}`;
  }

  updateAnimal(id: string, animal: Partial<Animal>): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiUrl}/update/${id}`, animal);
  }

  updateStatus(dto: { animalId: string; status: string }): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiUrl}/status`, dto);
  }

  deleteAnimal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { withCredentials: true });
  }
}
