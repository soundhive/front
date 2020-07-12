import { Component, OnDestroy, OnInit } from '@angular/core';
import { Playlist } from '../../playlist';
import { PlaylistsService } from '../../services/playlists.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists: Playlist[];
  playlistLink = '/playlist';
  playlistsSubscription: Subscription;

  constructor(private playlistsService: PlaylistsService) {}

  ngOnInit(): void {
    this.playlistsSubscription = this.playlistsService.playlistsSubject.subscribe(
      (data: any) => {
        this.playlists = data;
      },
    );
    this.playlistsService.emitPlaylists();
  }

  ngOnDestroy() {
    this.playlistsSubscription.unsubscribe();
  }
}
