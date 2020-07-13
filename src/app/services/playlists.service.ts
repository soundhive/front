import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  playlists = [
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

  playlistsSubject = new Subject<any[]>();

  constructor() {}

  emitPlaylists() {
    this.playlistsSubject.next(this.playlists);
  }

  getPlaylists() {}

  create(playlist) {
    this.playlists.push(playlist);
  }
}
