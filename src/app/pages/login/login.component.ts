import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [MatFormField, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton,
            MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  protected loginForm : FormGroup;
  constructor(private fb : FormBuilder, private router : Router){
    this.loginForm = fb.group({
      email: [null,[Validators.email, Validators.required]],
      senha: [null, [Validators.required]]
    });
  }
  // para apresentar vou redirecionar de uma vez, sem mandar pro back-end.
  submit() {
    console.log('Submiting');
  }

  back(){
    this.router.navigate(['/']);
  }
}
