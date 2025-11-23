import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OngService } from '../../../core/services/ong.service';
import { Ong } from '../../../core/models/ong.model';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ViaCepService } from '../../../core/services/via-cep.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';


@Component({
  selector: 'app-registro-ong',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './registro-ong-modal.component.html',
  styleUrl: './registro-ong-modal.component.scss'
})
export class RegistroOngModalComponent implements OnInit {
  protected ongForm: FormGroup;
  protected blockFields : boolean = false;
  constructor(private dialogRef : MatDialogRef<RegistroOngModalComponent>, private fb : FormBuilder, private ongService : OngService, private viaCepService : ViaCepService){
    this.ongForm = this.fb.group({
      cnpj: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      ddd: ['', [Validators.required], Validators.pattern('[0-9]{2}')],
      phone: ['', [Validators.required], Validators.pattern('[0-9]{9}')],
      addressDto: this.fb.group({
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
  ngOnInit(): void {
    this.ongForm.get('addressDto.cep')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter((cep: string) => !!cep && cep.replace(/\D/g, '').length === 8)
    ).subscribe(() => this.findAddress());
  
  }


  findAddress() : void{
    const cep = this.ongForm.get('addressDto')?.get('cep')?.value || '';
    if (cep.length !== 8) {
      this.ongForm.get('addressDto')?.get('cep')?.setErrors({ cepInvalido: true });
      return;
    }

    this.viaCepService.buscarCep(cep).subscribe({
      next: (data) => {
        if (data.erro) {
          this.ongForm.get('addressDto')?.get('cep')?.setErrors({ cepNaoEncontrado: true });
          return;
        }

        this.ongForm.get('addressDto')!.patchValue({
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
        });
        this.blockFields = true;
      },
      error: () => {
        this.ongForm.get('addressDto')!.get('cep')?.setErrors({ erroApi: true });
      },
    });
  }

  onSubmit(){
    if(this.ongForm.invalid){
      return;
    }
    
    const ong : Ong = this.ongForm.value
    ong.phone = '9'+ ong.phone;
    this.ongService.createOng(ong).subscribe({
      next: (res) =>{
        this.dialogRef.close(true);
      },
      error: (res) =>{
        console.error(res);
      }
    });
  }
  onCancel(){
    this.dialogRef.close();
  }
}
