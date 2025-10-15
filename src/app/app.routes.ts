import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'main-page', component: MainPageComponent},
    { path: 'login', component: LoginComponent},
    { path: '**', redirectTo: '' } 
];
