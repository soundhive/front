import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistsService } from '../../services/playlists.service';
import { Playlist } from '../../models/playlist';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  id: string;
  playlist: Playlist;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistsService: PlaylistsService,
    public alertService: AlertService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    this.playlistsService.getPlaylist(this.id).subscribe((res: Playlist) => {
      console.log(res);
      this.playlist = res;
    });
  }

  ngOnInit(): void {}

  onDeletePlaylist() {
    this.playlistsService.deletePlaylist(this.playlist);
    this.router.navigate(['profile']);
    this.alertService.success(
      'Playlist has been successfully deleted',
      this.options,
    );
  }
}
