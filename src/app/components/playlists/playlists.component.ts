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
  playlistsSubscriptions: Subscription[] = [];

  constructor(private playlistsService: PlaylistsService) {}

  ngOnInit(): void {
    this.playlistsSubscriptions.push(
      this.playlistsService.getPlaylists().subscribe((data: any) => {
        this.playlists = data.items;
      }),
      this.playlistsService.addPlaylistEvent.subscribe((res) => {
        this.playlists.push(res);
      }),
      this.playlistsService.removePlaylistEvent.subscribe((res) => {
        this.playlists = this.playlists.filter((p) => {
          return res.id !== p.id;
        });
      }),
    );
  }

  ngOnDestroy() {
    this.playlistsSubscriptions.forEach((subscription) =>
      subscription.unsubscribe(),
    );
  }
}
