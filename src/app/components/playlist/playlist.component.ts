import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService } from '../../services/playlists.service';
import { Playlist } from '../../playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  id: number;
  playlist: Playlist;

  constructor(
    private route: ActivatedRoute,
    private playlistsService: PlaylistsService,
  ) {}

  ngOnInit(): void {}
}
