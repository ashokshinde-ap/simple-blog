import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ILogin } from './ILogin';
import { Injectable } from '@angular/core';
import { IRegister } from './IRegister';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'x-access-token': localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null,
  };
  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };
  private blogData: IRegister[] = [];
  private accessToken = 'abc';
  private url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  register(register: IRegister): Observable<IRegister> {
    return this.httpClient.post<IRegister>(this.url + 'create', register);
    // this.blogData.push(register);
    // return true;
  }

  login(login: ILogin): Observable<any> {
    return this.httpClient.post(this.url + 'login', login);
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url + 'getAllUsers', this.requestOptions);
  }
}
