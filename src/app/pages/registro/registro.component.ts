import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  protected usuarioForm : FormGroup;
  constructor(private fb: FormBuilder){
    this.usuarioForm = this.fb.group({
      primeiroNome : [null, Validators.required, Validators.pattern('[a-zA-Z ]*')],
      sobrenome : [null, Validators.required, Validators.pattern('[a-zA-Z ]*')]
      
    })
  }

}
