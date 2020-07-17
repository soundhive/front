import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { User } from '../models/user';
import { Track } from '../models/track';
import { Album } from '../models/album';
import { Listening } from '../models/listening';
import { ListeningPagination } from '../models/pagination/listening-pagination';

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

  getTrack(id: string): Observable<Track> {
    const url = `${this.endpoint}/tracks/${id}`;
    return this.http
      .get<Track>(url)
      .pipe(catchError(this.handleError<Track>(`getTrack id=${id}`)));
  }

  getIsTrackFavorited(track: Track): Observable<{ favorited: boolean }> {
    const url = `${this.endpoint}/tracks/${track.id}/isfavorited`;
    return this.http
      .get<{ favorited: boolean }>(url)
      .pipe(
        catchError(
          this.handleError<{ favorited: boolean }>(
            `getIsTrackFavorited track.id=${track.id}`,
          ),
        ),
      );
  }

  postFavoriteTrack(track: Track): Observable<void> {
    return this.http
      .post<any>(`${this.endpoint}/tracks/${track.id}/favorite`, null)
      .pipe(catchError(this.handleError));
  }

  deleteFvoriteTrack(track: Track): Observable<any> {
    return this.http
      .delete<any>(`${this.endpoint}/tracks/${track.id}/favorite`)
      .pipe(catchError(this.handleError));
  }

  postTrackListening(track: Track): Observable<void> {
    return this.http
      .post<any>(`${this.endpoint}/tracks/${track.id}/listen`, null)
      .pipe(catchError(this.handleError));
  }

  getListeningsForUser(
    username: string,
    page: number = 1,
    limit: number = 5,
  ): Observable<ListeningPagination> {
    const url = `${this.endpoint}/users/${username}/history`;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http
      .get<ListeningPagination>(url, {
        params,
      })
      .pipe(
        catchError(
          this.handleError<ListeningPagination>(
            `getListeningsForUser username=${username}`,
          ),
        ),
      );
  }
}
