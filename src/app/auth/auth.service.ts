import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ILogin } from './ILogin';
import { Injectable } from '@angular/core';
import { IRegister } from './IRegister';
import { mapTo, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // headerDict = {
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   authorization: localStorage.getItem('token')
  //     ? `Bearer ${localStorage.getItem('token')}`
  //     : null,
  // };
  // requestOptions = {
  //   headers: new HttpHeaders(this.headerDict),
  // };
  private url = environment.apiUrl;
  private storeToken = 'token';
  loggedUser = localStorage.getItem(this.storeToken);

  constructor(private httpClient: HttpClient) {}

  register(register: IRegister): Observable<any> {
    return this.httpClient.post<any>(this.url + 'create', register);
    // this.blogData.push(register);
    // return true;
  }

  login(user: ILogin): Observable<boolean> {
    return this.httpClient.post(this.url + 'login', user).pipe(
      tap((tokens) => this.doLoginUser(tokens)),
      mapTo(true),
      catchError(() => {
        // alert(error.error);
        return of(false);
      })
    );
  }

  logout() {
    this.removeToken();
    return this.loggedUser;
  }
  removeToken() {
    localStorage.removeItem(this.storeToken);
    this.loggedUser = null;
  }

  getAll(): Observable<any> {
    // console.log(this.headerDict.authorization);
    return this.httpClient.get(this.url + 'demoTest');
  }

  doLoginUser(tokens) {
    this.loggedUser = tokens.token;
    this.storeTokens(tokens);
  }
  storeTokens(tokens) {
    // console.log(tokens);
    localStorage.setItem(this.storeToken, tokens.token);
  }
  getTokenStatus() {
    if (localStorage.getItem(this.storeToken) != null) {
      return true;
    } else false;
  }

  getToken(): string {
    if (
      localStorage.getItem(this.storeToken) != null &&
      this.loggedUser != null
    ) {
      return this.loggedUser;
    } else {
      this.loggedUser = null;
      return this.loggedUser;
    }
  }
}
