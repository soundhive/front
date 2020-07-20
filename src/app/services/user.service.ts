import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { Favorite } from '../models/favorite';
import { Listening } from '../models/listening';
import { Pagination } from '../models/pagination/pagination';
import { Track } from '../models/track';
import { User } from '../models/user';
import { AuthService } from '../shared/auth.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  getUser(username: string | null): Observable<User> {
    if (!username) {
      return this.apiService.getSelfProfile();
    }
    return this.apiService.getUser(username);
  }

  getUsers(): Observable<User[]> {
    return this.apiService.getUsers();
  }

  getUserTracks(
    username: string,
    page?: number,
    limit?: number,
  ): Observable<Pagination<Track>> {
    return this.apiService.getUserTracks(username, page, limit);
  }

  getUserAlbums(
    username: string,
    page?: number,
    limit?: number,
  ): Observable<Pagination<Album>> {
    return this.apiService.getUserAlbums(username, page, limit);
  }

  followUser(user: User): Observable<void> {
    return this.apiService.postFollowUser(user);
  }

  unfollowUser(user: User): Observable<void> {
    return this.apiService.deleteFollowUser(user);
  }

  getTracksHistory(
    username: string,
    page?: number,
    limit?: number,
  ): Observable<Pagination<Listening>> {
    return this.apiService.getListeningsForUser(username, page, limit);
  }

  getFavoriteTracks(
    username: string,
    page?: number,
    limit?: number,
  ): Observable<Pagination<Favorite>> {
    return this.apiService.getFavoriteTracksForUser(username, page, limit);
  }

  updateUser(user: FormData) {
    return this.apiService.putUser(user, this.authService.username);
  }

  getFollowings(
    username: string,
    page?: number,
    limit?: number,
  ): Observable<Pagination<User>> {
    return this.apiService.getUserFollowings(username, page, limit);
  }

  getFollowedUsersTracks(
    username: string,
    page?: number,
    limit?: number,
  ): Observable<Pagination<Track>> {
    return this.apiService.getFollowedUsersTracks(username, page, limit);
  }

  getFollowedUsersAlbums(
    username: string,
    page?: number,
    limit?: number,
  ): Observable<Pagination<Album>> {
    return this.apiService.getFollowedUsersAlbums(username, page, limit);
  }
}
