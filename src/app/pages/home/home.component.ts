import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

interface Animal {
  nome: string;
  especie: 'Gato' | 'Cachorro';
  idade: number;
  foto: string;
  descricao: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router:Router, private dialog:MatDialog){
  }
  animais: Animal[] = [
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

  redirectTo(address:string){
    this.router.navigate([`/${address}`]);
  }

  login() {
    this.dialog.open(LoginComponent, {
      height: '70%',
      width: '50%',
    });
  }
}
