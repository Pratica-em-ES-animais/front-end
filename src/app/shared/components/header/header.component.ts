import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserStateService, UserRole } from '../../../core/services/user-state.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    console.log('Abrindo modal de cadastro de animal...');
  }

  login() {
    this.router.navigate(['/login']);
  }

  logon() {
    this.router.navigate(['/registro']);
  }
}
