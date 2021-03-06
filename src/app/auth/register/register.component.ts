import { FormErrorService } from './../../source/form-error.service';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { IRegister } from '../IRegister';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateStrongPassword } from '../../source/strong-password.validator';
import { AppMatchFieldsValidator } from '../../source/match-fields.validator';
declare var $: any;

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  blogRegisterData: IRegister;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private errorService: FormErrorService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern('^.+@.+\\..+$')]],
        password: ['', [Validators.required, ValidateStrongPassword]],
        confirmPassword: ['', Validators.required],
      },
      { validator: AppMatchFieldsValidator('password', 'confirmPassword') }
    );
  }

  hasRequierError = (controlName: string): boolean =>
    this.errorService.hasRequiredError(controlName, this.registerForm);

  hasPattern = (controlName: string) =>
    this.errorService.hasPatternError(controlName, this.registerForm);

  hasStrongPassword = (controlName: string) =>
    this.errorService.hasStrongPasswordError(controlName, this.registerForm);

  hasPasswordMismatchError = (): boolean =>
    this.errorService.hasPasswordMismatchError(this.registerForm);

  ngOnInit(): void {
    this.blogRegisterData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  onSubmit() {
    if (this.registerForm.status === 'INVALID') {
      return this.errorService.displayFormErrors(this.registerForm);
    }
    console.log(this.blogRegisterData);
    this.blogRegisterData.firstName = this.registerForm.get('firstName').value;
    this.blogRegisterData.lastName = this.registerForm.get('lastName').value;
    this.blogRegisterData.email = this.registerForm.get('email').value;
    this.blogRegisterData.password = this.registerForm.get('password').value;
    // console.log(this.registerForm.value);
    // this.registerForm.reset();
    this.registerUser(this.blogRegisterData);
    $('#registerModel').modal('hide');
  }

  registerUser(registerData: IRegister) {
    this.authService.register(this.blogRegisterData).subscribe((data) => {
      // console.log(data.message);
      this.toastr.success(data.message);
      this.route.navigateByUrl('/login');
    });
  }

  resetForm() {
    this.registerForm.reset();
  }
}
