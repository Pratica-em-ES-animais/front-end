import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Animal } from '../../../core/models/animal.model';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AnimaisService } from '../../../core/services/animais.service';
import { Role } from '../../../core/models/role.model';
import { AdoptionService } from '../../../core/services/adoption.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animal-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, RouterModule, FormsModule],
  templateUrl: './animal-modal.component.html',
  styleUrls: ['./animal-modal.component.scss'],
})
export class AnimalModalComponent {

  public currentUser: { id: string } | null = null;

  // status que o tutor pode setar manualmente
  statusOptionsTutor: string[] = ['AVAILABLE', 'LOST', 'DECEASED'];
  newStatus: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { animal: Animal; role: Role },
    private dialogRef: MatDialogRef<AnimalModalComponent>,
    private router: Router,
    private animaisService: AnimaisService,
    private adoptionService: AdoptionService
  ) {
    const userStored = localStorage.getItem("currentUser");
    if (userStored) {
      this.currentUser = JSON.parse(userStored);
    }

    this.newStatus = this.data.animal.status;
  }

  getPhoto(): string {
    if (!this.data.animal.photo) {
      return 'assets/img/no-photo.png';
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

  getStatusClass(): string {
    const status = this.data.animal.status;

    const map: Record<string, string> = {
      AVAILABLE: 'status-available',
      PENDING: 'status-pending',
      ADOPTED: 'status-adopted',
      LOST: 'status-lost',
      DECEASED: 'status-deceased'
    };

    return map[status] ?? 'status-available';
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

  createAdoption() {
    const userStored = localStorage.getItem("currentUser");
    if (!userStored) {
      console.error("Usuário não encontrado no localStorage");
      return;
    }

    const user = JSON.parse(userStored) as { id: string };

    const animalId = this.data.animal.id;
    const tutorId = this.data.animal.tutorIds[0];
    const adopterId = user.id;

    if (!animalId || !tutorId || !adopterId) {
      console.error("Dados insuficientes para criar uma adoção:", {
        animalId,
        tutorId,
        adopterId
      });
      return;
    }

    const adoptionDto = { animalId, tutorId, adopterId };

    console.log("📤 Enviando DTO para /api/adoption/create:", adoptionDto);

    this.adoptionService.createAdoption(adoptionDto).subscribe({
      next: (response) => {
        console.log("Adoção criada:", response);
      },
      error: (err) => {
        console.error("❌ Erro ao criar adoção:", err);
        if (err.error) {
          console.error("Detalhes do erro retornado pelo backend:", err.error);
        }
      }
    });
  }

  confirmarAdocao() {
    const dto = {
      animalId: this.data.animal.id,
      status: 'ADOPTED'
    };
    console.log(dto);
    this.animaisService.updateStatus(dto).subscribe({
      next: () => {
        console.log("🐶 Status do animal atualizado para 'ADOPTED'");
        this.data.animal.status = 'ADOPTED';
        this.dialogRef.close('adoptionSuccess');
      },
      error: (err) => {
        console.error("❌ Erro ao atualizar status:", err);
      }
    });
  }

  canEditStatus(): boolean {
    return this.data.role === 'ONG'
      && this.currentUser?.id === this.data.animal.tutorIds[0];
  }

  updateStatusManual() {
    if (!this.newStatus || this.newStatus === this.data.animal.status) {
      return;
    }

    const dto = {
      animalId: this.data.animal.id,
      status: this.newStatus
    };

    console.log('Atualizando status manualmente:', dto);

    this.animaisService.updateStatus(dto).subscribe({
      next: (updatedAnimal) => {
        console.log('✅ Status atualizado:', updatedAnimal);
        this.data.animal.status = updatedAnimal.status ?? this.newStatus;
      },
      error: (err) => {
        console.error('❌ Erro ao atualizar status manualmente:', err);
      }
    });
  }
}
