import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-registro-ong',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './registro-ong-modal.component.html',
  styleUrl: './registro-ong-modal.component.scss'
})
export class RegistroOngModalComponent {
  protected ongForm: FormGroup;

  constructor(private dialogRef : MatDialogRef<RegistroOngModalComponent>, private fb : FormBuilder){
    this.ongForm = this.fb.group({
      cnpj: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      ddd: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: this.fb.group({
        cep: [null, [Validators.required]],
        uf: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        complemento: [''],
        numero: [null, [Validators.required]],
        logradouro: ['', [Validators.required]],
      })
    });
  }

  onSubmit(){

  }
  onCancel(){

  }
}
