import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { ILogin } from './../ILogin';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login: ILogin;
  constructor(private authService: AuthService, private route: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      remember: new FormControl(),
    });
  }
  ngOnInit(): void {
    this.login = {
      email: '',
      password: '',
      remember: false,
    };
  }
  getValue(controlName: string) {
    return this.loginForm.get(controlName).value;
  }

  loginUser(loginData: ILogin) {
    this.authService.login(loginData).subscribe(
      (data) => {
        if (data) {
          sessionStorage.setItem('userId', data.userId);
          sessionStorage.setItem('token', data.token);
          console.log(data);
          this.authService.getAll().subscribe((data) => {
            console.log(data);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.login.email = this.getValue('email');
    this.login.password = this.getValue('password');
    this.login.remember = this.getValue('remember');
    // console.log(this.login);
    this.loginUser(this.login);
  }
}
