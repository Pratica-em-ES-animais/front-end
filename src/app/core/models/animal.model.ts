import { StatusPet } from "./status-pet";

export interface Animal {
  id: string;
  name: string;

  // Species
  species: 'Cachorro' | 'Gato';

  // Breed (Cachorro OU Gato)
  dogBreed?:
    | 'VIRA_LATA'
    | 'LABRADOR'
    | 'POODLE'
    | 'BULLDOG'
    | 'GOLDEN_RETRIEVER'
    | 'PINSCHER'
    | 'SHIH_TZU'
    | 'PASTOR_ALEMAO'
    | 'SRD';

  catBreed?:
    | 'PERSA'
    | 'SIAMES'
    | 'MAINE_COON'
    | 'SPHYNX'
    | 'ANGORA'
    | 'BENGAL'
    | 'BRITISH_SHORTHAIR';

  // Sex
  sex: 'M' | 'F';

  // Age
  age: number;

  // PetSize
  size: 'Pequeno' | 'Medio' | 'Grande' | 'Gigante';

  neutered: boolean;
  vaccinated: boolean;

  // Temperament
  temperament: 'Docil' | 'Normal' | 'Imprevisivel' | 'Agitado';

  // Energy
  energy: 'Baixa' | 'Media' | 'Alta';

  // Sociability
  sociability: 'Introvertido' | 'Normal' | 'Sociavel';

  // Foto (filename retornado pelo backend)
  photo: string;

  health_details: string;
  description: string;

  // StatusPet
  status: StatusPet;

  tutorIds: string[];
}
