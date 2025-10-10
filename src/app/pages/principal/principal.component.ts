import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-principal',
  imports: [MatButton, MatButtonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {
  constructor(private dialog : MatDialog){}
  login(){
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '70%',
      width: '50%'
    });
  }
}
