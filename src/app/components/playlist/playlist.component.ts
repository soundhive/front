import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  id: number;
  playlist: Playlist;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.id = Number.parseInt(params.id, 10);
      this.playlist = this.playlistService.getPlaylist(this.id);
    });
  }

  ngOnInit(): void { }

  onDelete(playlist: Playlist) {

  }
}
