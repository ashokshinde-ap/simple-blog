import { LoginguardGuard } from './source/loginguard.guard';
import { HastokenGuard } from './source/hastoken.guard';
import { HomeComponent } from './blog/home/home.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'register',
    canActivate: [LoginguardGuard],
    component: RegisterComponent,
  },
  { path: 'login', canActivate: [LoginguardGuard], component: LoginComponent },
  {
    path: 'register-success',
    component: RegisterSuccessComponent,
  },
  { path: 'home', canActivate: [HastokenGuard], component: HomeComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
