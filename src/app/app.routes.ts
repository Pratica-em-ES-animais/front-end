import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'home', component: PrincipalComponent},
    { path: 'login', component: LoginComponent},
    { path: '**', redirectTo: '' } 
];
