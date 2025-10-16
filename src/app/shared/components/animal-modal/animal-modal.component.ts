import { Component, Inject } from '@angular/core';
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

    // ✅ referência do modal para fechar
    private dialogRef: MatDialogRef<AnimalModalComponent>,

    // ✅ Router para redirecionar
    private router: Router
  ) {}

  adotar() {
    console.log(`${this.data.animal.name} adotado!`);
  }

  login() {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }
}
