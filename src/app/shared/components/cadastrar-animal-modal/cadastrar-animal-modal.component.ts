import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cadastrar-animal-modal',
  standalone: true,
  templateUrl: './cadastrar-animal-modal.component.html',
  styleUrls: ['./cadastrar-animal-modal.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CadastrarAnimalModalComponent {
  animalForm: FormGroup;
  imagePreview: string | null = null;
  dragOver = false;

  especies = ['Cachorro', 'Gato'];
  sexos = ['M', 'F'];
  tamanhos = ['Pequeno', 'Médio', 'Grande', 'Gigante'];
  temperamentos = ['Dócil', 'Normal', 'Imprevisível', 'Agressivo'];
  energias = ['Baixa', 'Média', 'Alta'];
  sociabilidades = ['Introvertido', 'Normal', 'Sociável'];
  statusList = ['AVAILABLE', 'ADOPTED', 'PENDING', 'LOST', 'DECEASED'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastrarAnimalModalComponent>
  ) {
    this.animalForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      breed: ['', Validators.required],
      sex: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      size: ['', Validators.required],
      neutered: [false],
      vaccinated: [false],
      temperament: ['', Validators.required],
      energy: ['', Validators.required],
      sociability: ['', Validators.required],
      health_details: [''],
      description: [''],
      status: ['AVAILABLE', Validators.required],
      photo: [''],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.previewImage(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.previewImage(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave() {
    this.dragOver = false;
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.animalForm.valid) {
      console.log('🐾 Novo animal cadastrado:', this.animalForm.value);
      this.dialogRef.close(this.animalForm.value);
    } else {
      this.animalForm.markAllAsTouched();
    }
  }

  fechar() {
    this.dialogRef.close();
  }
}