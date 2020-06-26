import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getUser(username: string | null): Observable<User> {
    if (!username) {
      return this.apiService.getSelfProfile();
    }
    return this.apiService.getUser(username);
  }

  getUserTracks(username: string): Observable<Track[]> {
    return this.apiService.getUserTracks(username);
  }
}
