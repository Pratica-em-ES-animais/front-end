import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { CardAnimalComponent } from "../../shared/card-animal/card-animal.component";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    CardAnimalComponent
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  form!: FormGroup<{
    nome: FormControl<string | null>;
    especie: FormControl<string | null>;
    raca: FormControl<string | null>;
    idade: FormControl<number | null>;
    tamanho: FormControl<string | null>;
    energia: FormControl<string | null>;
    temperamento: FormControl<string | null>;
    historico: FormControl<string | null>;
  }>;

    animais = [
    {
      nome: 'Luna',
      especie: 'Gato',
      idade: 2,
      foto: 'https://cataas.com/cat?width=200&height=200&random=1',
      descricao: 'Gata curiosa e dorminhoca.'
    },
    {
      nome: 'Thor',
      especie: 'Cachorro',
      idade: 4,
      foto: 'https://placedog.net/200/200',
      descricao: 'Cachorro leal e protetor.'
    },
    {
      nome: 'Nina',
      especie: 'Gato',
      idade: 3,
      foto: 'https://cataas.com/cat?width=200&height=200&random=2',
      descricao: 'Adora janelas e mimos.'
    },
    {
      nome: 'Max',
      especie: 'Cachorro',
      idade: 5,
      foto: 'https://placedog.net/201/200',
      descricao: 'Ama correr e brincar com bola.'
    },
    {
      nome: 'Mia',
      especie: 'Gato',
      idade: 1,
      foto: 'https://cataas.com/cat?width=200&height=200&random=3',
      descricao: 'Pequena, carinhosa e muito esperta.'
    },
    {
      nome: 'Rex',
      especie: 'Cachorro',
      idade: 6,
      foto: 'https://placedog.net/202/200',
      descricao: 'Grandão, tranquilo e muito amigo.'
    }
  ];



  especies = ['Gato', 'Cachorro'];
  racas: string[] = [];
  tamanhos = ['Pequeno', 'Médio', 'Grande', 'Extra-Grande'];
  energias = ['Calmo', 'Meio-termo', 'Agitado', 'Muito agitado'];
  temperamentos = ['Dócil', 'Amigável', 'Arisco'];
  historicoMedico = [
    'Possui doenças crônicas',
    'Possui doenças transmissíveis',
    'Não possui problemas de saúde crônico',
  ];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: this.fb.control(''),
      especie: this.fb.control(''),
      raca: this.fb.control(''),
      idade: this.fb.control(0),
      tamanho: this.fb.control(''),
      energia: this.fb.control(''),
      temperamento: this.fb.control(''),
      historico: this.fb.control(''),
    });

    this.form.controls.especie.valueChanges.subscribe((val) => {
      this.atualizarRacas(val ?? '');
    });
  }

  atualizarRacas(especie: string) {
    if (especie === 'Gato') {
      this.racas = ['SRD', 'Persa', 'Siamês', 'Maine Coon', 'Angorá'];
    } else if (especie === 'Cachorro') {
      this.racas = [
        'SRD',
        'Labrador',
        'Poodle',
        'Bulldog',
        'Golden Retriever',
        'Shih Tzu',
        'Vira-lata',
      ];
    } else {
      this.racas = [];
    }
  }

  filtrar() {
    console.log('Filtros aplicados:', this.form.value);
  }

  limpar() {
    this.form.reset();
  }

  login() {
    this.dialog.open(LoginComponent, {
      height: '70%',
      width: '50%',
    });
  }
}
