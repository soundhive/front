import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { User } from '../models/user';
import { Track } from '../models/track';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.api_endpoint;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getSelfProfile(): Observable<User> {
    const url = `${this.endpoint}/profile`;
    return this.http
      .get<User>(url)
      .pipe(catchError(this.handleError<User>(`getSelfProfile`)));
  }

  getUser(username: string): Observable<User> {
    const url = `${this.endpoint}/users/${username}`;
    return this.http
      .get<User>(url)
      .pipe(catchError(this.handleError<User>(`getUser username=${username}`)));
  }

  getUserTracks(username: string): Observable<{ items: Track[] }> {
    const url = `${this.endpoint}/users/${username}/tracks`;
    return this.http
      .get<{ items: Track[] }>(url)
      .pipe(
        catchError(
          this.handleError<{ items: Track[] }>(
            `getUserTracks username=${username}`,
          ),
        ),
      );
  }

  getUserAlbums(username: string): Observable<Album[]> {
    const url = `${this.endpoint}/users/${username}/albums`;
    return this.http
      .get<Album[]>(url)
      .pipe(
        catchError(
          this.handleError<Album[]>(`getUserAlbums username=${username}`),
        ),
      );
  }
}
