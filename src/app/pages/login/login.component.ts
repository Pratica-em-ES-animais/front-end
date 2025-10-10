import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from "@angular/material/button";
import { MatDialog, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton,
    MatDialogContent, MatDialogActions, MatIconModule, MatIconButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  protected loginForm : FormGroup;
  constructor(private fb : FormBuilder){
    this.loginForm = fb.group({
      email: [null,[Validators.email, Validators.required]],
      senha: [null, [Validators.required]]
    });
  }
  // para apresentar vou redirecionar de uma vez, sem mandar pro back-end.
  submit() {
    console.log('Submiting');
  }
}
