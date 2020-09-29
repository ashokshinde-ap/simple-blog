import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ILogin } from './ILogin';
import { Injectable } from '@angular/core';
import { IRegister } from './IRegister';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private blogData: IRegister[] = [];
  private accessToken = 'abc';
  private url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  register(register: IRegister): Observable<IRegister> {
    return this.httpClient.post<IRegister>(this.url + 'users', register);
    // this.blogData.push(register);
    // return true;
  }

  login(login: ILogin) {
    let result = this.blogData.find((data) => {
      if (data.email == login.email && data.password == login.password) {
        return true;
      }
    });
    console.log(result);

    if (result) {
      localStorage.setItem('token', this.accessToken);
      return true;
    } else {
      localStorage.removeItem('token');
      return false;
    }
  }
}
