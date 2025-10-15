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
    Cachorro: [
      'SRD',
      'Labrador',
      'Poodle',
      'Bulldog',
      'Golden Retriever',
      'Shih Tzu',
      'Vira-lata',
    ],
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
      neutered: [''],
      vaccinated: [''],
      temperament: [''],
      energy: [''],
      sociability: [''],
      status: ['']
    });

    this.animais = this.animaisService.getAll();
    this.animaisFiltrados = [...this.animais];

    this.userState.userRole$.subscribe(role => this.role = role);

    this.form.controls['species'].valueChanges.subscribe(val => {
      if (val) this.form.controls['breed'].setValue('');
    });
  }

  filtrar(): void {
    const f = this.form.value;
    this.animaisFiltrados = this.animais.filter(a =>
      (!f.name || a.name.toLowerCase().includes(f.name.toLowerCase())) &&
      (!f.species || a.species === f.species) &&
      (!f.breed || a.breed === f.breed) &&
      (!f.sex || a.sex === f.sex) &&
      (!f.size || a.size === f.size) &&
      (!f.energy || a.energy === f.energy) &&
      (!f.temperament || a.temperament === f.temperament) &&
      (!f.sociability || a.sociability === f.sociability) &&
      (f.neutered === '' || a.neutered === f.neutered) &&
      (f.vaccinated === '' || a.vaccinated === f.vaccinated) &&
      (!f.status || a.status === f.status)
    );
  }

  getRacas(species: string | null): string[] {
  if (!species || !this.racas[species as 'Gato' | 'Cachorro']) {
    return [];
  }
  return this.racas[species as 'Gato' | 'Cachorro'];
}

  limpar(): void {
    this.form.reset();
    this.animaisFiltrados = [...this.animais];
  }

  setUserType(role: UserRole) {
    this.userState.setUserRole(role);
  }
}
