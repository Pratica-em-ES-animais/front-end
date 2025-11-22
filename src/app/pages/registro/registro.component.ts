import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RegistroUsuarioService } from '../../core/services/registro-usuario.service';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelect, MatOption, MatSelectModule } from "@angular/material/select";
import { Ong } from '../../core/models/ong.model';
import { Router } from '@angular/router';
import { User } from '../../core/models/user-model';
import { UserLogin } from '../../core/models/user-login.model';
import { MatDialog } from '@angular/material/dialog';
import { RegistroOngModalComponent } from '../../shared/components/ong-modal/registro-ong-modal.component';
import { config } from 'rxjs';


@Component({
  selector: 'app-registro',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonModule, NgxMaskDirective, MatIconModule, CommonModule,
    MatButtonToggleModule, MatSelect, MatOption, MatSelectModule,FormsModule],
  templateUrl: './registro.component.html',
  providers: [provideNgxMask()],
  styleUrl: './registro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegistroComponent {
  protected usuarioForm : FormGroup;
  protected tutorForm : FormGroup;
  protected ongs : Ong[];
  protected pwd = signal(true);
  protected pwdConfirmation = signal(true);
  protected role : 'user' | 'tutor' = 'user';
  private readonly router: Router;
  
  constructor(private fb: FormBuilder, private readonly service : RegistroUsuarioService, private matDialog : MatDialog){
    this.router = inject(Router);
    this.usuarioForm = this.fb.group({
      primeiroNome : [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      sobrenome: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cpf: [null, [Validators.required, Validators.pattern('[0-9]{11}')]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
      ddd: [null, [Validators.required, Validators.pattern('[0-9]{2}')]],
      telefone: [null, [Validators.required, Validators.pattern('[0-9]{9}')]],
      lifestyle: [null, [Validators.required, Validators.maxLength(100)]],
      preferences: [null, [Validators.required, Validators.maxLength(100)]]
    });

    this.tutorForm = this.fb.group({
      primeiroNome : [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      sobrenome: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cpf: [null, [Validators.required, Validators.pattern('[0-9]{11}')]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
      ddd: [null, [Validators.required, Validators.pattern('[0-9]{2}')]],
      telefone: [null, [Validators.required, Validators.pattern('[0-9]{9}')]],
      ongs : [null, [Validators.required]]
    });
    this.ongs = [];

  }
 
  hidePwd(event:MouseEvent){
    this.pwd.set(!this.pwd());
    event.stopPropagation();
  }

  redirect(event:MouseEvent){
    this.router.navigate(['/']);
    event.stopPropagation();
  }

  submit(){
    if(this.formAtual.invalid){
      this.logFormErrors(this.formAtual);
      return;
    }

    if(this.formAtual == this.usuarioForm){
      const user : User = {
        firstName :  this.usuarioForm.value.primeiroNome,
        lastName : this.usuarioForm.value.sobrenome,
        cpf : this.usuarioForm.value.cpf,
        email : this.usuarioForm.value.email,
        senha : this.usuarioForm.value.senha,
        ddd : this.usuarioForm.value.ddd,
        phone : this.usuarioForm.value.telefone,
        lifestyle : this.usuarioForm.value.lifestyle,
        preferences : this.usuarioForm.value.preferences
      }
      console.log('tipo: ', this.role, 'payload', user);
      this.service.createUser(user).subscribe({
        next: (res) =>{
          const storeUser : UserLogin = {
            id : res.id,
            firstName : res.firstName,
            lastName : res.lastName,
            role : res.role
          }
          localStorage.setItem('currentUser', JSON.stringify(storeUser));
          this.router.navigate(['/main-page']);
        },
        error: (err)=>{
          console.error(err);
        }
      })
    }
  }

  get formAtual(): FormGroup {
    return this.role === 'user' ? this.usuarioForm : this.tutorForm;
  }

  logFormErrors(form: FormGroup, parentKey: string = '') {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);

      const controlPath = parentKey ? `${parentKey}.${key}` : key;

      if (control instanceof FormGroup) {
        // se for outro formGroup, chama recursivamente
        this.logFormErrors(control, controlPath);
      } else {
        console.log(
          `Control "${controlPath}" -> value:`,
          control?.value,
          'errors:',
          control?.errors
        );
      }
    });
  }
  openModal(){
    this.matDialog.open(
      RegistroOngModalComponent,{
        width: '90vh',
        height: 'auto'
      }
    )
  }
}


