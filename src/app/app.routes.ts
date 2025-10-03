import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'registro', component: RegistroComponent},
    { path: '**', redirectTo: '' } 
];
