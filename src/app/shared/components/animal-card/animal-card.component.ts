import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Animal } from '../../../core/models/animal.model';
import { UserRole } from '../../../core/services/user-state.service';
import { AnimalModalComponent } from '../animal-modal/animal-modal.component';
import { AnimaisService } from '../../../core/services/animais.service';
import { Role } from '../../../core/models/role.model';

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

  constructor(
    private dialog: MatDialog,
    private animaisService: AnimaisService
  ) {}

  getBreed(): string {
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
      return 'assets/img/no-photo.png'; // opcional
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
