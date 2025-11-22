// DTO deve ter os mesmos campos que o backend espera
export interface AdoptionCreateDto { 
  animalId: string;
  adopterId: string;
  tutorId: string;
}