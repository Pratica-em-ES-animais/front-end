import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { AnimaisService } from '../../core/services/animais.service';
import { UserRole, UserStateService } from '../../core/services/user-state.service';
import { Animal } from '../../core/models/animal.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AnimalCardComponent } from '../../shared/components/animal-card/animal-card.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatCheckboxModule,
    HeaderComponent,
    AnimalCardComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  form!: FormGroup;
  animais: Animal[] = [];
  animaisFiltrados: Animal[] = [];
  racasFiltradas: string[] = [];
  role: UserRole = 'NOLOG';
  

  especies = ['Cachorro', 'Gato'];
  sexos = ['M', 'F'];
  tamanhos = ['Pequeno', 'Médio', 'Grande', 'Gigante'];
  energias = ['Baixa', 'Média', 'Alta'];
  temperamentos = ['Dócil', 'Normal', 'Imprevisível', 'Agressivo'];
  sociabilidades = ['Introvertido', 'Normal', 'Sociável'];
  status = ['AVAILABLE', 'ADOPTED', 'PENDING', 'LOST', 'DECEASED'];

    racas: Record<'Gato' | 'Cachorro', string[]> = {
      Gato: ['SRD', 'Persa', 'Siamês', 'Maine Coon', 'Angorá'],
      Cachorro: ['SRD', 'Labrador', 'Poodle', 'Bulldog', 'Golden Retriever', 'Shih Tzu', 'Vira-lata']
    };

  
  constructor(
    private fb: FormBuilder,
    private animaisService: AnimaisService,
    private userState: UserStateService
  ) {}

ngOnInit(): void {
  this.form = this.fb.group({
    name: [''],
    species: [''],
    breed: [''],
    sex: [''],
    age: [0],
    size: [''],
    neutered: [false],
    vaccinated: [false],
    temperament: [''],
    energy: [''],
    sociability: [''],
    status: ['']
  });

  // CORREÇÃO: getAll() devolve Observable
  this.animaisService.getAll().subscribe(data => {
    this.animais = data;
    this.animaisFiltrados = [...data];
  });

  this.form.valueChanges.subscribe(() => this.filtrar());

  this.userState.userRole$.subscribe(role => this.role = role);

  // Atualiza raças ao mudar espécie
  this.form.controls['species'].valueChanges.subscribe(species => {
    const tipo = species as 'Gato' | 'Cachorro';
    
    if (tipo in this.racas) {
      this.racasFiltradas = this.racas[tipo];
    } else {
      this.racasFiltradas = [];
    }

    this.form.controls['breed'].setValue('');
  });

}


filtrar(): void {
    const f = this.form.value;

    this.animaisFiltrados = this.animais.filter(a => {

      const racaAnimal =
        a.species === 'Cachorro' ? a.dogBreed :
        a.species === 'Gato' ? a.catBreed :
        '';

      if (f.name && !a.name.toLowerCase().includes(f.name.toLowerCase())) return false;
      if (f.species && a.species !== f.species) return false;

      // 🔥 Raça corrigida
      if (f.breed && racaAnimal !== f.breed) return false;

      if (f.sex && a.sex !== f.sex) return false;
      if (f.size && a.size !== f.size) return false;
      if (f.energy && a.energy !== f.energy) return false;
      if (f.temperament && a.temperament !== f.temperament) return false;
      if (f.sociability && a.sociability !== f.sociability) return false;
      if (f.status && a.status !== f.status) return false;

      if (f.age > 0 && a.age > f.age) return false;
      if (f.neutered && !a.neutered) return false;
      if (f.vaccinated && !a.vaccinated) return false;

      return true;
    });
  }


  limpar(): void {
    this.form.reset({
      name: '',
      species: '',
      breed: '',
      sex: '',
      age: 0,
      size: '',
      neutered: false,
      vaccinated: false,
      temperament: '',
      energy: '',
      sociability: '',
      status: ''
    });

    this.racasFiltradas = [];
    this.animaisFiltrados = [...this.animais];
  }

  setUserType(role: UserRole) {
    this.userState.setUserRole(role);
  }
}
