import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserStateService, UserRole } from '../../../core/services/user-state.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CadastrarAnimalModalComponent } from '../cadastrar-animal-modal/cadastrar-animal-modal.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() role!: UserRole;

  constructor(private userState: UserStateService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.userState.userRole$.subscribe(role => this.role = role);
  }

  irParaHome() {
    this.router.navigate(['/']);
  }

  abrirPerfil() {
    console.log('Abrindo perfil...');
  }

  cadastrarAnimal() {
    this.dialog.open(CadastrarAnimalModalComponent, {
      width: 'auto',          // deixa o CSS controlar
      maxWidth: '1400px',
      height: '90vh',
      panelClass: 'custom-modal',
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  logon() {
    this.router.navigate(['/registro']);
  }
}
