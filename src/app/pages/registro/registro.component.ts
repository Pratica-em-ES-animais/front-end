import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { User } from '../../models/user-model';
import { RegistroUsuarioService } from '../../services/registro-usuario.service';
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
  protected userDataForm : FormGroup;
  protected currentForm : FormGroup;


  protected roleForm : FormGroup;
  protected tituloStep = "Escolha seu perfil";
  protected subtituloStep = "Selecione sua função";


  protected pwd = signal(true);
  protected pwdConfirmation = signal(true);
  private readonly router: Router;
  protected role : string | null = null;
  protected tutorDataForm: FormGroup;

  constructor(private fb: FormBuilder, private readonly service : RegistroUsuarioService){
    this.router = inject(Router);
    this.roleForm = this.fb.group({
      role : [null, [Validators.required]]
    });
    this.userDataForm = this.fb.group({
      primeiroNome : [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      sobrenome: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cpf: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
      confirmarSenha: [null, Validators.required],
      ddd: [null, [Validators.required]],
      telefone: [null, [Validators.required]]
    });
    this.tutorDataForm = this.fb.group({});
    this.currentForm = this.fb.group({});

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
    if(this.currentForm.invalid){
      console.log(this.currentForm.controls);
      return;
    }
    console.log(this.currentForm.value);

    const user : User = {
      primeiroNome :  this.currentForm.value.primeiroNome,
      sobrenome : this.currentForm.value.sobrenome,
      cpf : this.currentForm.value.cpf,
      email : this.currentForm.value.email,
      senha : this.currentForm.value.senha,
      ddd : this.currentForm.value.ddd,
      telefone : this.currentForm.value.telefone
    }
    this.service.createUser(user);
    this.router.navigate(['/']);
  }

  form(role : string){
    this.role = role;
    this.roleForm.patchValue({ role: role });
    this.currentForm = role === 'user' ? this.userDataForm : this.tutorDataForm;
    
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


