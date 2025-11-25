import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Animal } from '../../../core/models/animal.model';
import { AnimalModalComponent } from '../animal-modal/animal-modal.component';
import { AnimaisService } from '../../../core/services/animais.service';
import { Role } from '../../../core/models/role.model';
import { StatusPet } from '../../../core/models/status-pet';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
})
export class AnimalCardComponent {
  @Input() animal!: Animal;
  @Input() role: Role | null = null;

  public statusLabel: Record<string, string> = {
    AVAILABLE: 'DISPONÍVEL',
    PENDING: 'PENDENTE',
    ADOPTED: 'ADOTADO',
    LOST: 'PERDIDO',
    DECEASED: 'FALECIDO',
  };

  constructor(
    private dialog: MatDialog,
    private animaisService: AnimaisService
  ) {}

  getBreed(): string {
    console.log(StatusPet[this.animal.status as unknown as keyof typeof StatusPet]);
    if (this.animal.species === 'Cachorro') {
      return this.animal.dogBreed ? this.formatEnum(this.animal.dogBreed) : 'Sem raça';
    }
    if (this.animal.species === 'Gato') {
      return this.animal.catBreed ? this.formatEnum(this.animal.catBreed) : 'Sem raça';
    }
    return 'Sem raça';
  }

  getPhoto(): string {
    if (!this.animal.photo) {
      return 'assets/img/no-photo.png';
    }
    return this.animaisService.getPhotoUrl(this.animal.photo);
  }

  abrirDetalhes() {
    this.dialog.open(AnimalModalComponent, {
      width: '90vw',
      maxWidth: '900px',
      height: 'auto',
      maxHeight: '90vh',
      data: { animal: this.animal, role: this.role },
      panelClass: 'animal-dialog'
    });
  }

  getStatusClass(): string {
    const map: Record<string, string> = {
      AVAILABLE: 'status-available',
      PENDING: 'status-pending',
      ADOPTED: 'status-adopted',
      LOST: 'status-lost',
      DECEASED: 'status-deceased'
    };

    return map[this.animal.status] ?? 'status-available';
  }



  // =============================
  //  MAPEAR ENUMS DO BACKEND → PT-BR
  // =============================
  formatEnum(value: string): string {
    const map: Record<string, string> = {
      Cachorro: 'Cachorro',
      Gato: 'Gato',

      // Sex
      M: 'Macho',
      F: 'Fêmea',

      // Size
      Pequeno: 'Pequeno',
      Medio: 'Médio',
      Grande: 'Grande',
      Gigante: 'Gigante',

      // Temperament
      Docil: 'Dócil',
      Normal: 'Normal',
      Imprevisivel: 'Imprevisível',
      Agitado: 'Agitado',

      // Energy
      Baixa: 'Baixa',
      Media: 'Média',
      Alta: 'Alta',

      // Sociability
      Introvertido: 'Introvertido',
      Sociavel: 'Sociável',

      // DOG BREEDS
      VIRA_LATA: 'Vira-lata',
      LABRADOR: 'Labrador',
      POODLE: 'Poodle',
      BULLDOG: 'Bulldog',
      GOLDEN_RETRIEVER: 'Golden Retriever',
      PINSCHER: 'Pinscher',
      SHIH_TZU: 'Shih Tzu',
      PASTOR_ALEMAO: 'Pastor Alemão',
      SRD: 'Sem raça definida',

      // CAT BREEDS
      PERSA: 'Persa',
      SIAMES: 'Siamês',
      MAINE_COON: 'Maine Coon',
      SPHYNX: 'Sphynx',
      ANGORA: 'Angorá',
      BENGAL: 'Bengal',
      BRITISH_SHORTHAIR: 'British Shorthair'
    };

    return map[value] ?? value;
  }
}
