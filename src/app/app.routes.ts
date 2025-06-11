import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register-user', component: RegisterUserComponent }
];

  
