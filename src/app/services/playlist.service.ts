import { Injectable } from '@angular/core';
import { Playlist } from '../playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  playlist: Playlist[] = [];

  constructor() {
    this.playlist = [
      {
        id: 1,
        title: 'Summer playlist',
      },
      {
        id: 2,
        title: 'Workout',
      },
      {
        id: 3,
        title: 'All times favorites',
      },
      {
        id: 4,
        title: 'Road trip',
      },
      {
        id: 5,
        title: 'Post Rock',
      },
    ];
  }

  getPlaylists() {
    return this.playlist;
  }

  getPlaylist(id: number) {
    return this.getPlaylists().find((p) => p.id === id);
  }

  addPlaylist(playlist: Playlist) {
    this.playlist.push(playlist);
  }

  // deletePlaylist(playlist: Playlist) {
  //
  // }
}
