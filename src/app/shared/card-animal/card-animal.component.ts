import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-animal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-animal.component.html',
  styleUrl: './card-animal.component.scss'
})
export class CardAnimalComponent {
  @Input() animal!: {
    nome: string;
    especie: string;
    idade: number;
    foto: string;
    descricao: string;
  };
}
