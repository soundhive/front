import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { Track } from '../models/track';
import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUser(username: string | null): Observable<User> {
    if (!username) {
      return this.apiService.getSelfProfile();
    }
    return this.apiService.getUser(username);
  }

  getUserTracks(username: string): Observable<{ items: Track[] }> {
    return this.apiService.getUserTracks(username);
  }

  getUserAlbums(username: string): Observable<Album[]> {
    return this.apiService.getUserAlbums(username);
  }

  followUser(user: User): Observable<void> {
    return this.apiService.postFollowUser(user);
  }

  unfollowUser(user: User): Observable<void> {
    return this.apiService.deleteFollowUser(user);
  }
}
