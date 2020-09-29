import { Router } from '@angular/router';
import { IRegister } from '../IRegister';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  blogRegisterData: IRegister;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  ngOnInit(): void {
    this.blogRegisterData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  onSubmit() {
    this.blogRegisterData.firstName = this.registerForm.get('firstName').value;
    this.blogRegisterData.lastName = this.registerForm.get('lastName').value;
    this.blogRegisterData.email = this.registerForm.get('email').value;
    this.blogRegisterData.password = this.registerForm.get('password').value;
    // console.log(this.registerForm.value);
    this.registerForm.reset();
    this.registerUser(this.blogRegisterData);
  }

  registerUser(registerData: IRegister) {
    this.authService.register(this.blogRegisterData).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
