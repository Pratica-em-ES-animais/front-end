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
      width: '90vw',          // ocupa 90% da largura da tela
      maxWidth: '900px',     // limite visual em desktops grandes
      height: 'auto',
      maxHeight: '90vh',      // impede de passar da altura visível
      data: { animal: this.animal, role: this.role },
      panelClass: 'animal-dialog' // classe para estilização global opcional
    });
  }
}
