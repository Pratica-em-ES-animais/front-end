import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { User } from '../../core/models/user-model';
import { RegistroUsuarioService } from '../../core/services/registro-usuario.service';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { CdkStepperModule, StepperSelectionEvent } from "@angular/cdk/stepper";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-registro',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule,
            NgxMaskDirective, MatIconModule, CommonModule, MatStepperModule, MatRadioModule,
            FormsModule, CdkStepperModule, MatDatepickerModule],
  templateUrl: './registro.component.html',
  providers: [provideNgxMask(), provideNativeDateAdapter()],
  styleUrl: './registro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegistroComponent {
  protected usuarioForm : FormGroup;
  protected roleForm : FormGroup;
  protected tituloStep = "Escolha seu perfil";
  protected subtituloStep = "Selecione sua função";


  protected pwd = signal(true);
  protected pwdConfirmation = signal(true);
  private readonly router: Router;
  protected role : string | null = null;

  constructor(private fb: FormBuilder, private readonly service : RegistroUsuarioService){
    this.router = inject(Router);
    this.roleForm = this.fb.group({
      role : [null, [Validators.required]]
    });
    this.usuarioForm = this.fb.group({
      primeiroNome : [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      sobrenome: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cpf: [null, [Validators.required, Validators.pattern('[0-9]{11}')]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
      confirmarSenha: [null, Validators.required],
      ddd: [null, [Validators.required, Validators.pattern('[0-9]{2}')]],
      telefone: [null, [Validators.required, Validators.pattern('[0-9]{9}')]]
    });
  }
 
  hidePwd(event:MouseEvent){
    this.pwd.set(!this.pwd());
    event.stopPropagation();
  }

  
  hidePwdConfirmation(event:MouseEvent){
    this.pwdConfirmation.set(!this.pwdConfirmation());
    event.stopPropagation();
  }

  redirect(event:MouseEvent){
    this.router.navigate(['/']);
    event.stopPropagation();
  }

  submit(){
    if(this.usuarioForm.invalid){
      return;
    }
    const user : User = {
      primeiroNome :  this.usuarioForm.value.primeiroNome,
      sobrenome : this.usuarioForm.value.sobrenome,
      cpf : this.usuarioForm.value.cpf,
      email : this.usuarioForm.value.email,
      senha : this.usuarioForm.value.senha,
      ddd : this.usuarioForm.value.ddd,
      telefone : this.usuarioForm.value.telefone
    }
    this.service.createUser(user);
  }

  form(role : string){
    console.log(role);
    this.role = role;
    this.roleForm.patchValue({ role: role });
  }

  atualizarTitulos(event : StepperSelectionEvent){
    if(this.role === 'user'){
      switch(event.selectedIndex){
        case 0:
          this.tituloStep = "Escolha seu perfil";
          this.subtituloStep = "Selecione sua função";
          break;
        case 1:
          this.tituloStep = "Preencha seus dados pessoais";
          this.subtituloStep = '';
          break;
        
      }
    }
  }
}


