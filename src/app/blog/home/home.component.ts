import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}
  ngOnDestroy() {}
  onClick() {
    this.authService.getAll().subscribe((data) => {
      console.log(data);
      this.route.navigateByUrl('register');
    });
  }
}
