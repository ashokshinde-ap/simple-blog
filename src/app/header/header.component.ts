import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, Subscriber } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.toastr.success('Logout Successfully');
    this.route.navigateByUrl('login');
  }
}
