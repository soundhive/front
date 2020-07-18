import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Playlist } from '../models/playlist';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
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

  createPlaylist(playlist) {
    return this.apiService.createPlaylist(playlist);
    // this.playlists.push(playlist);
  }

  deletePlaylist(playlist: Playlist) {
    return this.apiService.deletePlaylist(playlist.id);
  }
}
