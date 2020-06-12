import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../playlist';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[];
  playlistLink = '/playlist';

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.playlists = this.playlistService.getPlaylists();
  }

  onCreate() { }

  deletePlaylist(playlist: Playlist) {
    console.log('delete me!');
    // this.playlists = this.playlists.filter((p) => p.id !== playlist.id);
    // this.playlistService.deletePlaylist(playlist);
  }
}
