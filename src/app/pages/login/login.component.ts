import { Component, signal, Signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { Login } from '../../core/models/login.model';

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton,
            MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  protected loginForm : FormGroup;
  protected senhaInvalida = signal(false);
  constructor(private fb : FormBuilder, private router : Router, private loginService : LoginService){
    this.loginForm = fb.group({
      email : new FormControl<string>('',[Validators.email, Validators.required]),
      password: ['', [Validators.required]]
    });
  }
  submit() {
    if(!this.loginForm.valid){
      console.log('Opa!');
      return;
    }
    const body : Login = {
      email : this.loginForm.get('email')?.value,
      senha : this.loginForm.get('password')?.value
    }
    this.loginService.login(body).subscribe({
      next: (res) =>{
        this.router.navigate(['/main-page'])
      },
      error : (res) =>{
        this.senhaInvalida.set(true);
        console.log(res);
      }
    });

  }

  back(){
    this.router.navigate(['/']);
  }

}
