import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint = environment.api_endpoint;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  signUp(user: User): Observable<any> {
    const api = `${this.endpoint}/users`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/auth/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.access_token);
        this.currentUser = res;
        this.router.navigate(['user-profile/' + res.username]);
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null);
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(username): Observable<any> {
    if (!username) {
      return this.http.get(`${this.endpoint}/profile`, { headers: this.headers }).pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
    }

    return this.http.get(`${this.endpoint}/users/${username}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
