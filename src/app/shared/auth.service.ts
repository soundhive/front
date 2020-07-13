import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = environment.api_endpoint;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  signUp(user: FormData): Observable<any> {
    const api = `${this.endpoint}/users`;
    return this.http
      .post(api, user, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/auth/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('username', user.username);
        this.router.navigate(['user/' + user.username]);
      });
  }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  // Get token form local storage, convert base64 to JSON and extract username from payload
  get username(): string | null {
    const token = localStorage.getItem('access_token');
    const payload: { username: string } = JSON.parse(atob(token.split('.')[1]));

    return payload.username;
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(error.error);
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  }
}
