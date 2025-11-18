import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Animal } from '../models/animal.model';

@Injectable({ providedIn: 'root' })
export class AnimaisService {
  private animaisInicial: Animal[] = [
    {
      id: '1',
      name: 'Rex',
      species: 'Cachorro',
      breed: 'Vira-lata',
      sex: 'M',
      age: 3,
      size: 'Grande',
      neutered: true,
      vaccinated: true,
      temperament: 'Dócil',
      energy: 'Alta',
      sociability: 'Sociável',
      photo: 'https://placedog.net/400/300?id=1',
      health_details: 'Saudável, vacinado e castrado.',
      description: 'Cachorro brincalhão, adora correr e se dar bem com outros cães.',
      status: 'AVAILABLE',
      tutorIds: []
    },
    {
      id: '2',
      name: 'Luna',
      species: 'Gato',
      breed: 'Siamês',
      sex: 'F',
      age: 2,
      size: 'Pequeno',
      neutered: true,
      vaccinated: true,
      temperament: 'Normal',
      energy: 'Média',
      sociability: 'Normal',
      photo: 'https://cataas.com/cat?width=400&height=300&random=2',
      health_details: 'Boa saúde geral.',
      description: 'Gatinha carinhosa e tranquila, gosta de ficar perto de pessoas.',
      status: 'AVAILABLE',
      tutorIds: []
    },
    {
      id: '3',
      name: 'Max',
      species: 'Cachorro',
      breed: 'Labrador',
      sex: 'M',
      age: 5,
      size: 'Grande',
      neutered: false,
      vaccinated: true,
      temperament: 'Imprevisível',
      energy: 'Alta',
      sociability: 'Normal',
      photo: 'https://placedog.net/400/300?id=2',
      health_details: 'Boa saúde, não castrado.',
      description: 'Muito ativo, precisa de espaço para correr e brincar.',
      status: 'AVAILABLE',
      tutorIds: []
    },
    {
      id: '4',
      name: 'Mia',
      species: 'Gato',
      breed: 'Persa',
      sex: 'F',
      age: 4,
      size: 'Pequeno',
      neutered: true,
      vaccinated: true,
      temperament: 'Dócil',
      energy: 'Baixa',
      sociability: 'Introvertido',
      photo: 'https://cataas.com/cat?width=400&height=300&random=4',
      health_details: 'Pelagem longa, exige escovação frequente.',
      description: 'Muito calma, ideal para apartamento silencioso.',
      status: 'AVAILABLE',
      tutorIds: []
    },
    {
      id: '5',
      name: 'Thor',
      species: 'Cachorro',
      breed: 'Pastor Alemão',
      sex: 'M',
      age: 6,
      size: 'Grande',
      neutered: true,
      vaccinated: true,
      temperament: 'Agressivo',
      energy: 'Alta',
      sociability: 'Normal',
      photo: 'https://placedog.net/400/300?id=3',
      health_details: 'Excelente saúde, precisa de adestramento constante.',
      description: 'Cão protetor, ideal para guarda e companhia fiel.',
      status: 'AVAILABLE',
      tutorIds: []
    },
    {
      id: '6',
      name: 'Nina',
      species: 'Cachorro',
      breed: 'Shih Tzu',
      sex: 'F',
      age: 1,
      size: 'Pequeno',
      neutered: false,
      vaccinated: true,
      temperament: 'Dócil',
      energy: 'Média',
      sociability: 'Sociável',
      photo: 'https://placedog.net/400/300?id=4',
      health_details: 'Saudável, precisa de tosa regular.',
      description: 'Companheira e amorosa, se adapta bem a ambientes pequenos.',
      status: 'AVAILABLE',
      tutorIds: []
    },
    {
      id: '7',
      name: 'Tom',
      species: 'Gato',
      breed: 'Maine Coon',
      sex: 'M',
      age: 5,
      size: 'Grande',
      neutered: true,
      vaccinated: true,
      temperament: 'Normal',
      energy: 'Média',
      sociability: 'Sociável',
      photo: 'https://cataas.com/cat?width=400&height=300&random=5',
      health_details: 'Grande porte, pelagem densa.',
      description: 'Gato curioso e sociável, ótimo companheiro para famílias.',
      status: 'AVAILABLE',
      tutorIds: []
    },
    {
      id: '8',
      name: 'Belinha',
      species: 'Cachorro',
      breed: 'Poodle',
      sex: 'F',
      age: 8,
      size: 'Médio',
      neutered: true,
      vaccinated: false,
      temperament: 'Dócil',
      energy: 'Baixa',
      sociability: 'Normal',
      photo: 'https://placedog.net/400/300?id=5',
      health_details: 'Idosa, precisa de acompanhamento veterinário.',
      description: 'Muito calma, carinhosa e obediente, ótima para idosos.',
      status: 'AVAILABLE',
      tutorIds: []
    }
  ];

  private animaisSubject = new BehaviorSubject<Animal[]>(this.animaisInicial);
  animais$ = this.animaisSubject.asObservable();

  getAll(): Animal[] {
    return this.animaisSubject.value;
  }

  addAnimal(animal: Omit<Animal, 'id'>) {
    const novoAnimal: Animal = {
      ...animal,
      id: "1",
      photo: animal.photo || 'https://placehold.co/400x300?text=Novo+Animal'
    };
    const atual = [...this.animaisSubject.value, novoAnimal];
    this.animaisSubject.next(atual);
    console.log('✅ Animal adicionado:', novoAnimal);
  }
}
