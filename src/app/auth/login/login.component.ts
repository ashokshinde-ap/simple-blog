import { RegisterComponent } from './../register/register.component';
import { FormErrorService } from './../../source/form-error.service';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { ILogin } from './../ILogin';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild(RegisterComponent) viewChildInfo: RegisterComponent;
  loginForm: FormGroup;
  loginUserData: ILogin;
  constructor(
    private authService: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private errorService: FormErrorService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      remember: new FormControl(),
    });
  }
  ngOnInit(): void {}
  getValue(controlName: string) {
    return this.loginForm.get(controlName).value;
  }

  loginUser(loginUserData: ILogin) {
    this.authService.login(loginUserData).subscribe(
      (data) => {
        // console.log(data);
        if (data) {
          this.toastr.success('Login Successfully.');
          this.route.navigateByUrl('/home');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (this.loginForm.status === 'INVALID') {
      return this.errorService.displayFormErrors(this.loginForm);
    }
    this.loginUserData = {
      email: '',
      password: '',
      remember: false,
    };
    this.loginUserData.email = this.getValue('email');
    this.loginUserData.password = this.getValue('password');
    this.loginUserData.remember = this.getValue('remember');
    // console.log(this.login);
    this.loginUser(this.loginUserData);
  }

  openRegisterModel() {
    $('#registerModel').modal('show');
  }

  onCloseModel() {
    this.viewChildInfo.resetForm();
  }

  hasRequierError = (controlName: string): boolean =>
    this.errorService.hasRequiredError(controlName, this.loginForm);
}
