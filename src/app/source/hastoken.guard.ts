import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HastokenGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}
  canActivate(): Observable<boolean> {
    if (this.authService.getToken()) return of(true);
    else {
      this.route.navigateByUrl('/login');
    }
  }
}
