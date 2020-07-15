import { Component, OnDestroy, OnInit } from '@angular/core';
import { Playlist } from '../../models/playlist';
import { PlaylistsService } from '../../services/playlists.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists: Playlist[];
  playlistLink = '/playlists';
  playlistsSubscription: Subscription;

  constructor(private playlistsService: PlaylistsService) {}

  ngOnInit(): void {
    this.playlistsSubscription = this.playlistsService
      .getPlaylists()
      .subscribe((data: any) => {
        this.playlists = data.items;
      });
    this.playlistsService.emitPlaylists();
  }

  ngOnDestroy() {
    this.playlistsSubscription.unsubscribe();
  }
}
