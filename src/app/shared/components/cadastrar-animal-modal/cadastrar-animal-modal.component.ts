import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AnimaisService } from '../../../core/services/animais.service';
import { Animal } from '../../../core/models/animal.model';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { firstValueFrom } from 'rxjs';
import { AnimalCreateDto } from '../../../core/models/animal-create.dto';
import { UserLogin } from '../../../core/models/user-login.model';

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
  selectedFile: File | null = null;
  dragOver = false;

  especies = ['Cachorro', 'Gato'];

  dogBreeds = [
    'VIRA_LATA','LABRADOR','POODLE','BULLDOG','GOLDEN_RETRIEVER',
    'PINSCHER','SHIH_TZU','PASTOR_ALEMAO','SRD'
  ];

  catBreeds = [
    'PERSA','SIAMES','MAINE_COON','SPHYNX',
    'ANGORA','BENGAL','BRITISH_SHORTHAIR'
  ];

  sexos = ['M', 'F'];
  tamanhos = ['Pequeno', 'Medio', 'Grande', 'Gigante'];
  temperamentos = ['Docil', 'Normal', 'Imprevisivel', 'Agitado'];
  energias = ['Baixa', 'Media', 'Alta'];
  sociabilidades = ['Introvertido', 'Normal', 'Sociavel'];

  statusMap : Record<string,string> = {
    AVAILABLE : 'DISPONÍVEL',
    PENDING : 'PENDENTE',
    ADOPTED : 'ADOTADO',
    LOST : 'PERDIDO',
    DECEASED : 'FALECIDO'
  };
  statusList = ['AVAILABLE', 'PENDING', 'ADOPTED', 'LOST', 'DECEASED'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastrarAnimalModalComponent>,
    private animaisService: AnimaisService
  ) {
    this.animalForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],

      dogBreed: [''],
      catBreed: [''],

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
    });

    // Regras de validação dinâmica
    this.animalForm.get('species')?.valueChanges.subscribe(species => {
      this.updateBreedValidator(species);
    });
  }

  private updateBreedValidator(species: string) {
    const dog = this.animalForm.get('dogBreed');
    const cat = this.animalForm.get('catBreed');

    dog?.clearValidators();
    cat?.clearValidators();

    if (species === 'Cachorro') {
      dog?.setValidators([Validators.required]);
    } else if (species === 'Gato') {
      cat?.setValidators([Validators.required]);
    }

    dog?.updateValueAndValidity();
    cat?.updateValueAndValidity();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.previewImage(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;

    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage(file);
    }
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

async submit() {
  if (this.animalForm.invalid) {
    this.animalForm.markAllAsTouched();
    return;
  }

  try {
    const fv = this.animalForm.value;
    const tutorStored = localStorage.getItem("currentUser");
    if (!tutorStored) {
      return;
    } 

    const tutor = JSON.parse(tutorStored) as UserLogin
    const animalToCreate: AnimalCreateDto = {
      
      name: fv.name,
      species: fv.species,

      dogBreed: fv.species === 'Cachorro' ? fv.dogBreed : undefined,
      catBreed: fv.species === 'Gato' ? fv.catBreed : undefined,

      sex: fv.sex,
      age: fv.age,
      size: fv.size,
      neutered: !!fv.neutered,
      vaccinated: !!fv.vaccinated,
      temperament: fv.temperament,
      energy: fv.energy,
      sociability: fv.sociability,

      health_details: fv.health_details ?? '',
      description: fv.description ?? '',
      status: fv.status,

      tutorIds: [tutor.id]
    };

    const createdAnimal = await firstValueFrom(
      this.animaisService.createAnimal(animalToCreate)
    );

    let uploadedFilename = '';
    if (this.selectedFile) {
      console.log("▶ENVIANDO FOTO PARA /upload-photo:", this.selectedFile);

      const uploadResp = await firstValueFrom(
        this.animaisService.uploadPhoto(createdAnimal.id, this.selectedFile)
      );
      console.log("ID DO ANIMAL CRIADO: ", createdAnimal.id);
      console.log("✔️ RESPOSTA DO /upload-photo:", uploadResp);

      uploadedFilename = uploadResp.filename || '';
    }

    createdAnimal.photo = uploadedFilename;

    this.dialogRef.close(true);

  } catch (err) {
    console.error("ERRO AO CRIAR ANIMAL:", err);
  }
}



  fechar() {
    this.dialogRef.close();
  }
}
