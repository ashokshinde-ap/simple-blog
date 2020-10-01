import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { ILogin } from './../ILogin';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginUserData: ILogin;
  constructor(
    private authService: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      remember: new FormControl(),
    });
  }
  ngOnInit(): void {
    this.loginUserData = {
      email: '',
      password: '',
      remember: false,
    };
  }
  getValue(controlName: string) {
    return this.loginForm.get(controlName).value;
  }

  loginUser(loginUserData: ILogin) {
    this.authService.login(loginUserData).subscribe((data) => {
      // console.log(data);
      if (data) {
        this.toastr.success('Login Successfully.');
        this.route.navigateByUrl('/home');
      }
    });
  }
  onSubmit() {
    this.loginUserData.email = this.getValue('email');
    this.loginUserData.password = this.getValue('password');
    this.loginUserData.remember = this.getValue('remember');
    // console.log(this.login);
    this.loginUser(this.loginUserData);
  }
}
