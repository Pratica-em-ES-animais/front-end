import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-registro',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})

export class RegistroComponent {
  protected usuarioForm : FormGroup;
  constructor(private fb: FormBuilder){
    this.usuarioForm = this.fb.group({
      primeiroNome : [null, Validators.required, Validators.pattern('[a-zA-Z ]*')],
      sobrenome : [null, Validators.required, Validators.pattern('[a-zA-Z ]*')],
      cpf : [null, Validators.required, Validators.pattern('[0-9]{11}')],
      email : [null, Validators.required, Validators.email],
      senha : [null, Validators.required],
      ddd : [null, Validators.required, Validators.pattern('[0-9]{2}')],
      telefone: [null, Validators.required, Validators.pattern('[0-9]{9}')]
    })
  }

}
