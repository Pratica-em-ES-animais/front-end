import { StatusPet } from "./status-pet";

export interface Animal {
  id: string;
  name: string;

  species: 'Cachorro' | 'Gato';

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

  sex: 'M' | 'F';

  age: number;

  size: 'Pequeno' | 'Medio' | 'Grande' | 'Gigante';

  neutered: boolean;
  vaccinated: boolean;

  temperament: 'Docil' | 'Normal' | 'Imprevisivel' | 'Agitado';

  energy: 'Baixa' | 'Media' | 'Alta';

  sociability: 'Introvertido' | 'Normal' | 'Sociavel';

  photo: string;

  health_details: string;
  description: string;

  status: StatusPet;

  tutorIds: string[];
}
