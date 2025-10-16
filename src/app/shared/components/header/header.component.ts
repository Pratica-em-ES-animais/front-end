import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserStateService, UserRole } from '../../../core/services/user-state.service';
import { LoginComponent } from '../../../pages/login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() role!: UserRole;

  constructor(private userState: UserStateService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userState.userRole$.subscribe(role => this.role = role);
  }

  openLogin() {
    this.dialog.open(LoginComponent, { width: '50%', height: '70%' });
  }

  openRegister() {
    this.dialog.open(LoginComponent, { width: '50%', height: '70%' });
  }

  abrirPerfil() {
    console.log('Abrindo perfil...');
  }

  cadastrarAnimal() {
    console.log('Abrindo modal de cadastro de animal...');
  }
}
