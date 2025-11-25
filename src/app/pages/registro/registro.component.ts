import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
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
import { OngDto } from '../../core/models/ong.dto';
import { OngService } from '../../core/services/ong.service';
import { Tutor } from '../../core/models/tutor-model';
import { TutorService } from '../../core/services/tutor.service';


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

export class RegistroComponent implements OnInit{
  protected usuarioForm : FormGroup;
  protected tutorForm : FormGroup;
  protected ongs : OngDto[] = [];
  protected pwd = signal(true);
  protected pwdConfirmation = signal(true);
  protected role : 'user' | 'tutor' = 'user';
  private readonly router: Router;
  
  constructor(private fb: FormBuilder, private readonly adotanteService : RegistroUsuarioService, private matDialog : MatDialog,
     private ongService : OngService, private tutorService : TutorService ){
    this.router = inject(Router);
    this.usuarioForm = this.fb.group({
      primeiroNome : [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      sobrenome: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cpf: [null, [Validators.required, Validators.pattern('[0-9]{11}')]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
      ddd: [null, [Validators.required, Validators.pattern('[0-9]{2}')]],
      telefone: [null, [Validators.required, Validators.pattern('[0-9]{8,9}')]],
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
      telefone: [null, [Validators.required, Validators.pattern('[0-9]{8}')]],
      ongId : [null, [Validators.required]]
    });

  }
  ngOnInit(): void {
    this.ongService.getAll().subscribe({
      next: (res) =>
        this.ongs = res,
      error: (res) =>
        console.error(res)
      },
    );
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
    console.log(this.formAtual.value)
    if(this.formAtual.invalid){
      this.logFormErrors(this.formAtual);
      return;
    }

    if(this.formAtual == this.usuarioForm){
      const user : User = {
        firstName :  this.formAtual.value.primeiroNome,
        lastName : this.formAtual.value.sobrenome,
        cpf : this.formAtual.value.cpf,
        email : this.formAtual.value.email,
        senha : this.formAtual.value.senha,
        ddd : this.formAtual.value.ddd,
        phone : this.formAtual.value.telefone,
        lifestyle : this.formAtual.value.lifestyle,
        preferences : this.formAtual.value.preferences
      }
      user.phone = '9'+user.phone;
      this.adotanteService.createUser(user).subscribe({
        next: (res : UserLogin) =>{
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.router.navigate(['/main-page']);
        },
        error: (err)=>{
          console.error(err);
        }
      })
    }else{
      const tutor : Tutor = {
        firstName :  this.formAtual.value.primeiroNome,
        lastName : this.formAtual.value.sobrenome,
        cpf : this.formAtual.value.cpf,
        email : this.formAtual.value.email,
        senha : this.formAtual.value.senha,
        ddd : this.formAtual.value.ddd,
        phone : this.formAtual.value.telefone,
        ongId : this.formAtual.value.ongId
      }
      tutor.phone = '9'+tutor.phone;
      this.tutorService.create(tutor).subscribe({
        next: (res : UserLogin) =>{
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.router.navigate(['/main-page']);
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
    const dialogRef = this.matDialog.open(
      RegistroOngModalComponent,{
        width: '90vh',
        height: 'auto'
      }
    );
    dialogRef.afterClosed().subscribe(result =>{
      if(result == true){
        this.ongService.getAll().subscribe({
          next: (res) => this.ongs = res,
          error: (res) => console.error(res)
        })
      }
    })
  }
}


