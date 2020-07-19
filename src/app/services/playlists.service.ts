import { EventEmitter, Injectable, Output } from '@angular/core';
import { Playlist } from '../models/playlist';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  playlists = [];
  @Output() addPlaylistEvent = new EventEmitter<Playlist>();
  @Output() removePlaylistEvent = new EventEmitter<Playlist>();

  constructor(public router: Router, private apiService: ApiService) {}

  getPlaylists() {
    return this.apiService.getPlaylists();
  }

  getPlaylist(id: string) {
    return this.apiService.getPlaylist(id);
  }

  createPlaylist(playlist) {
    return this.apiService.createPlaylist(playlist);
  }

  deletePlaylist(playlist: Playlist) {
    return this.apiService.deletePlaylist(playlist.id);
  }

  addPlaylistToSidebar(playlist: Playlist) {
    this.addPlaylistEvent.emit(playlist);
  }

  removePlaylistFromSidebar(playlist: Playlist) {
    this.removePlaylistEvent.emit(playlist);
  }
}
