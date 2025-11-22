import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserStateService, UserRole } from '../../../core/services/user-state.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CadastrarAnimalModalComponent } from '../cadastrar-animal-modal/cadastrar-animal-modal.component';
import { Role } from '../../../core/models/role.model';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() role?: Role | null;
  Roles = Role;

  constructor(private userState: UserStateService, private loginService : LoginService,private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.userState.userRole$.subscribe(role => this.role = role);
    console.log(this.role);
  }

  irParaHome() {
    this.router.navigate(['/']);
  }

  abrirPerfil() {
    console.log('Abrindo perfil...');
  }

cadastrarAnimal() {
    const dialogRef = this.dialog.open(CadastrarAnimalModalComponent, {
      width: 'auto',
      maxWidth: '1400px',
      height: '90vh',
      panelClass: 'custom-modal',
    });

    // 🔥 Quando fechar o modal
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {     // qualquer valor indica que o modal fechou com sucesso
        this.animalCadastrado.emit();
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  logon() {
    this.router.navigate(['/registro']);
  }

  logout(){
    this.loginService.logout();
    this.userState.reset();
    this.router.navigate(['/'])
  }
}
