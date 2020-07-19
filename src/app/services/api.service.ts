import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from '../../environments/environment';
import { Album } from '../models/album';
import { Favorite } from '../models/favorite';
import { Listening } from '../models/listening';
import { Pagination } from '../models/pagination/pagination';
import { Playlist } from '../models/playlist';
import { Track } from '../models/track';
import { User } from '../models/user';

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

  private handleErrorForm(error: HttpErrorResponse) {
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

  getUsers(): Observable<User[]> {
    const url = `${this.endpoint}/users/`;
    return this.http
      .get<User[]>(url)
      .pipe(catchError(this.handleError<User[]>(`getUser`)));
  }

  getUserTracks(
    username: string,
    page: number = 1,
    limit: number = 5,
  ): Observable<Pagination<Track>> {
    const url = `${this.endpoint}/users/${username}/tracks`;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http
      .get<Pagination<Track>>(url, {
        params,
      })
      .pipe(
        catchError(
          this.handleError<Pagination<Track>>(
            `getUserTracks username=${username}`,
          ),
        ),
      );
  }

  getUserAlbums(
    username: string,
    page: number = 1,
    limit: number = 5,
  ): Observable<Pagination<Album>> {
    const url = `${this.endpoint}/users/${username}/albums`;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http
      .get<Pagination<Album>>(url, {
        params,
      })
      .pipe(
        catchError(
          this.handleError<Pagination<Album>>(
            `getUserAlbums username=${username}`,
          ),
        ),
      );
  }

  getTrack(id: string): Observable<Track> {
    const url = `${this.endpoint}/tracks/${id}`;
    return this.http
      .get<Track>(url)
      .pipe(catchError(this.handleError<Track>(`getTrack id=${id}`)));
  }

  getTracks(page?: number, limit?: number): Observable<Pagination<Track>> {
    const url = `${this.endpoint}/tracks/`;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http
      .get<Pagination<Track>>(url, {
        params,
      })
      .pipe(catchError(this.handleError<Pagination<Track>>(`getTracks`)));
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
  ): Observable<Pagination<Listening>> {
    const url = `${this.endpoint}/users/${username}/history`;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http
      .get<Pagination<Listening>>(url, {
        params,
      })
      .pipe(
        catchError(
          this.handleError<Pagination<Listening>>(
            `getListeningsForUser username=${username}`,
          ),
        ),
      );
  }

  postFollowUser(user: User): Observable<void> {
    return this.http
      .post<any>(`${this.endpoint}/users/${user.username}/follow`, null)
      .pipe(catchError(this.handleError));
  }

  deleteFollowUser(user: User): Observable<void> {
    return this.http
      .delete<any>(`${this.endpoint}/users/${user.username}/follow`)
      .pipe(catchError(this.handleError));
  }

  getChartingTracks(): Observable<Track[]> {
    const url = `${this.endpoint}/tracks/charts`;
    return this.http
      .get<Track[]>(url)
      .pipe(catchError(this.handleError<Track[]>(`getChartingTracks`)));
  }

  getFavoriteTracksForUser(
    username: string,
    page: number = 1,
    limit: number = 5,
  ): Observable<any> {
    const url = `${this.endpoint}/users/${username}/favorites`;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http
      .get<Pagination<Favorite>>(url, {
        params,
      })
      .pipe(
        catchError(
          this.handleError<Pagination<Favorite>>(
            `getFavoriteTracksForUser username=${username}`,
          ),
        ),
      );
  }

  putUser(user: FormData, username: string): Observable<any> {
    const api = `${this.endpoint}/users/${username}`;
    return this.http
      .put(api, user, { observe: 'response' })
      .pipe(catchError(this.handleErrorForm));
  }

  getAlbum(id: string): Observable<Album> {
    const url = `${this.endpoint}/albums/${id}`;
    return this.http
      .get<Album>(url)
      .pipe(catchError(this.handleError<Album>(`getAlbum id=${id}`)));
  }

  getAlbums(page?: number, limit?: number): Observable<Pagination<Album>> {
    const url = `${this.endpoint}/albums/`;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http
      .get<Pagination<Album>>(url, {
        params,
      })
      .pipe(catchError(this.handleError<Pagination<Album>>(`getAlbums`)));
  }

  getAlbumTracks(
    id: string,
    page: number = 1,
    limit: number = 5,
  ): Observable<Pagination<Track>> {
    const url = `${this.endpoint}/albums/${id}/tracks`;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http
      .get<Pagination<Track>>(url, {
        params,
      })
      .pipe(
        catchError(
          this.handleError<Pagination<Track>>(`getAlbumTracks id=${id}`),
        ),
      );
  }

  getUserFollowings(
    username: string,
    page: number = 1,
    limit: number = 5,
  ): Observable<Pagination<User>> {
    const url = `${this.endpoint}/users/${username}/followings`;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http
      .get<Pagination<User>>(url, {
        params,
      })
      .pipe(
        catchError(
          this.handleError<Pagination<User>>(
            `getUserFollowings username=${username}`,
          ),
        ),
      );
  }

  getFollowedUsersTracks(
    username: string,
    page: number = 1,
    limit: number = 5,
  ): Observable<Pagination<Track>> {
    const url = `${this.endpoint}/users/${username}/followings/tracks`;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http
      .get<Pagination<Track>>(url, {
        params,
      })
      .pipe(
        catchError(
          this.handleError<Pagination<Track>>(
            `getFollowedUsersTracks username=${username}`,
          ),
        ),
      );
  }

  getFollowedUsersAlbums(
    username: string,
    page: number = 1,
    limit: number = 5,
  ): Observable<Pagination<Album>> {
    const url = `${this.endpoint}/users/${username}/followings/albums`;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http
      .get<Pagination<Album>>(url, {
        params,
      })
      .pipe(
        catchError(
          this.handleError<Pagination<Album>>(
            `getFollowedUsersAlbums username=${username}`,
          ),
        ),
      );
  }

  getPlaylists(): Observable<Playlist[]> {
    const url = `${this.endpoint}/playlists`;
    return this.http
      .get<Playlist[]>(url)
      .pipe(catchError(this.handleError<Playlist[]>('getPlaylists')));
  }

  getPlaylist(id: string): Observable<Playlist> {
    const url = `${this.endpoint}/playlists/${id}`;
    return this.http
      .get<Playlist>(url)
      .pipe(catchError(this.handleError<Playlist>(`getPlaylist id=${id}`)));
  }

  createPlaylist(playlist: Playlist): Observable<Playlist> {
    const url = `${this.endpoint}/playlists`;
    return this.http
      .post<Playlist>(url, playlist)
      .pipe(catchError(this.handleErrorForm));
  }

  putPlaylist(playlist: FormData, playlistId): Observable<any> {
    const url = `${this.endpoint}/playlists${playlistId}`;
    return this.http
      .put(url, playlist, { observe: 'response' })
      .pipe(catchError(this.handleErrorForm));
  }

  deletePlaylist(id: string) {
    const url = `${this.endpoint}/playlists/${id}`;
    return this.http.delete(url);
  }
}
