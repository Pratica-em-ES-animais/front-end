import { Animal } from './animal.model';

export interface CompatibilityResult {
  pet: Animal;   // mesmo formato que você já usa na tela
  score: number; // 0.0 – 1.0, por exemplo
}
