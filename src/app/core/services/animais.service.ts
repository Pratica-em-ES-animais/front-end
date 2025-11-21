import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { AnimalCreateDto } from '../models/animal-create.dto';

@Injectable({ providedIn: 'root' })
export class AnimaisService {

  private apiUrl = 'http://localhost:8080/api/animal';

  constructor(private http: HttpClient) {}

  // =============================
  //   GET ALL ANIMALS (BACKEND)
  // =============================
  getAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/pets`);
  }

  // =============================
  //    CREATE ANIMAL (BACKEND)
  // =============================
  createAnimal(animal: AnimalCreateDto): Observable<Animal> {
    return this.http.post<Animal>(`${this.apiUrl}/create`, animal);
  }

  // =============================
  //   UPLOAD DE FOTO COM ID
  // =============================
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

  // =============================
  //   GET PHOTO URL FORMATTER
  // =============================
  getPhotoUrl(filename: string): string {
    return `${this.apiUrl}/photo/${filename}`;
  }
}
