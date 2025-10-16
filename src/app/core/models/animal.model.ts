export interface Animal {
  id: string;
  name: string;
  species: 'Cachorro' | 'Gato';
  breed: string;
  sex: 'M' | 'F';
  age: number;
  size: 'Pequeno' | 'Médio' | 'Grande' | 'Gigante';
  neutered: boolean;
  vaccinated: boolean;
  temperament: 'Dócil' | 'Normal' | 'Imprevisível' | 'Agressivo';
  energy: 'Baixa' | 'Média' | 'Alta';
  sociability: 'Introvertido' | 'Normal' | 'Sociável';
  photo: string;
  health_details: string;
  description: string;
  status: 'AVAILABLE' | 'ADOPTED' | 'PENDING' | 'LOST' | 'DECEASED';
  tutorIds: string[];
}
