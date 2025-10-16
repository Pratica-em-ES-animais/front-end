import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Animal } from '../../../core/models/animal.model';
import { UserRole } from '../../../core/services/user-state.service';
import { AnimalModalComponent } from '../animal-modal/animal-modal.component';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
})
export class AnimalCardComponent {
  @Input() animal!: Animal;
  @Input() role: UserRole = 'NOLOG';

  constructor(private dialog: MatDialog) {}

  abrirDetalhes() {
    this.dialog.open(AnimalModalComponent, {
      width: '80vw',
      maxWidth: '400px',
      height: 'auto',
      maxHeight: '90vh',
      data: { animal: this.animal, role: this.role },
      panelClass: 'animal-dialog'
    });
  }

}
