import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Animal } from '../../../core/models/animal.model';
import { UserRole } from '../../../core/services/user-state.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AnimaisService } from '../../../core/services/animais.service';

@Component({
  selector: 'app-animal-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, RouterModule],
  templateUrl: './animal-modal.component.html',
  styleUrls: ['./animal-modal.component.scss'],
})
export class AnimalModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { animal: Animal; role: UserRole },
    private dialogRef: MatDialogRef<AnimalModalComponent>,
    private router: Router,
    private animaisService: AnimaisService
  ) {}

    getPhoto(): string {
    if (!this.data.animal.photo) {
      return 'assets/img/no-photo.png'; // opcional
    }
    return this.animaisService.getPhotoUrl(this.data.animal.photo);
  }

  getBreed(): string {
    return this.data.animal.dogBreed ?? this.data.animal.catBreed ?? '';
  }

  login() {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  // Conversão dos enums — igual ao card
  formatEnum(value: string): string {
    const map: Record<string, string> = {
      Cachorro: 'Cachorro',
      Gato: 'Gato',
      M: 'Macho',
      F: 'Fêmea',
      Pequeno: 'Pequeno',
      Medio: 'Médio',
      Grande: 'Grande',
      Gigante: 'Gigante',
      Docil: 'Dócil',
      Normal: 'Normal',
      Imprevisivel: 'Imprevisível',
      Agitado: 'Agitado',
      Baixa: 'Baixa',
      Media: 'Média',
      Alta: 'Alta',
      Introvertido: 'Introvertido',
      Sociavel: 'Sociável',
      VIRA_LATA: 'Vira-lata'
    };

    return map[value] ?? value;
  }
}
