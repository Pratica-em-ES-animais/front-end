import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AnimaisService } from '../../core/services/animais.service';
import { Animal } from '../../core/models/animal.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  animais: Animal[] = [];

  constructor(
    private router: Router,
    private animaisService: AnimaisService
  ) {}

  ngOnInit(): void {
    this.animaisService.getAll().subscribe({
      next: (lista) => {
        this.animais = this.sortear(lista, 6);
      },
      error: (err) => console.error(err)
    });
  }

  // 🔹 Sorteia N animais aleatórios
  private sortear(lista: Animal[], n: number): Animal[] {
    return lista.sort(() => Math.random() - 0.5).slice(0, n);
  }

  // 🔥 Igual ao animal-modal.component.ts
  getPhoto(a: Animal): string {
    if (!a.photo) {
      return 'assets/img/no-photo.png';
    }
    return this.animaisService.getPhotoUrl(a.photo);
  }

  redirectTo(address: string) {
    this.router.navigate([`/${address}`]);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
