import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Playlist } from '../models/playlist';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  endpoint: string;
  playlists = [];

  playlistsSubject = new Subject<any[]>();

  constructor(public router: Router, private apiService: ApiService) {}

  emitPlaylists() {
    this.playlistsSubject.next(this.playlists);
  }

  getPlaylists() {
    return this.apiService.getPlaylists();
  }

  getPlaylist(id: string) {
    return this.apiService.getPlaylist(id);
  }

  create(playlist) {
    this.playlists.push(playlist);
  }
}
