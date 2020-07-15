import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService } from '../../services/playlists.service';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  id: string;
  playlist: Playlist;

  constructor(
    private route: ActivatedRoute,
    private playlistsService: PlaylistsService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    this.playlistsService.getPlaylist(this.id).subscribe((res: Playlist) => {
      console.log(res);
      this.playlist = res;
    });
  }

  ngOnInit(): void {}
}
