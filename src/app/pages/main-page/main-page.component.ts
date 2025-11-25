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
import { UserLogin } from '../../core/models/user-login.model';
import { Role } from '../../core/models/role.model';
import { FilterService } from '../../core/services/filter.service';
import { CompatibilityResult } from '../../core/models/compatibilityResult.dto';

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
  Roles = Role;
  animais: Animal[] = [];
  animaisFiltrados: Animal[] = [];
  racasFiltradas: string[] = [];
  currentUser: UserLogin | null = null;
  userRole : Role | null = null;

  especies = ['Cachorro', 'Gato'];
  sexos = ['M', 'F'];
  tamanhos = ['Pequeno', 'Medio', 'Grande', 'Gigante'];
  energias = ['Baixa', 'Media', 'Alta'];
  temperamentos = ['Docil', 'Normal', 'Imprevisivel', 'Agressivo'];
  sociabilidades = ['Introvertido', 'Normal', 'Sociavel'];
  status = ['AVAILABLE', 'ADOPTED', 'PENDING', 'LOST', 'DECEASED'];

    racas: Record<'Gato' | 'Cachorro', string[]> = {
      Gato: ['PERSA', 'SIAMES', 'MAINE_COON', 'SPHYNX', 'ANGORA', 'BENGAL', 'BRITISH_SHORTHAIR'],
      Cachorro: ['VIRA_LATA', 'LABRADOR', 'POODLE', 'BULLDOG', 'GOLDEN_RETRIEVER', 'PINSCHER', 'SHIH_TZU', 'PASTOR_ALEMAO', 'SRD']
    };

  usandoIA = false;

  constructor(
    private fb: FormBuilder,
    private animaisService: AnimaisService,
    private userState: UserStateService,
    private filterService: FilterService 
  ) {}

ngOnInit(): void {
  this.form = this.fb.group({
    name: [''],
    species: [''],
    all : [true],
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

  const stored = localStorage.getItem('currentUser');
  if(stored){
    this.currentUser = JSON.parse(stored) as UserLogin;
    this.userRole = this.currentUser.role;
    this.userState.setUserRole(this.userRole);

    console.log(this.userRole);
  }


  // CORREÇÃO: getAll() devolve Observable
  this.animaisService.getAll().subscribe(data => {
    this.animais = data;
    this.animaisFiltrados = [...data];
  });

  this.form.valueChanges.subscribe(() => this.filtrar());

  this.userState.userRole$.subscribe(role => this.userRole = role);

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
      if (f.all === false) {
        const currentUserId = this.currentUser?.id;
        const animaisDoTutorAtual = a.tutorIds?.some(t => t === currentUserId);
        if (!animaisDoTutorAtual) {
          return false;
        }
      }
      if (f.species && a.species !== f.species) return false;

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

  usarIA(): void {
      this.usandoIA = true;

      this.filterService.getCompatiblePets().subscribe({
        next: (results: CompatibilityResult[]) => {
          // Ordena por score decrescente, se já não vier ordenado
          results.sort((a, b) => b.score - a.score);

          // Atualiza a listagem apenas com os pets retornados
          this.animaisFiltrados = results.map(r => r.pet);

          // (opcional) se você quiser ver o score no console
          console.table(results.map(r => ({
            name: r.pet.name,
            score: r.score
          })));
        },
        error: (err) => {
          console.error('Erro ao usar IA de compatibilidade', err);
          this.usandoIA = false;
        }
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

    this.usandoIA = false;
    this.racasFiltradas = [];
    this.animaisFiltrados = [...this.animais];
  }

  setUserType(role: Role | null) {
    this.userState.setUserRole(role);
  }

  carregarAnimais() {
  this.animaisService.getAll().subscribe({
    next: (animais) =>{ this.animais = animais; this.animaisFiltrados = animais},
    error: (err) => console.error(err)
  });
}

}
