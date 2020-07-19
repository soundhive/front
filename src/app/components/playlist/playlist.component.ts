import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { AlertService } from '../../services/alert.service';
import { PlaylistsService } from '../../services/playlists.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../shared/auth.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  id: string;
  playlist: Playlist = new Playlist();
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  currentUser: User;
  playlistSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistsService: PlaylistsService,
    public alertService: AlertService,
    public userService: UserService,
    public authService: AuthService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    this.playlistSubscription = playlistsService
      .getPlaylist(this.id)
      .subscribe((res: Playlist) => {
        this.playlist = res;
      });

    this.userSubscription = this.userService
      .getUser(authService.username)
      .subscribe((res) => {
        this.currentUser = res;
      });

    // Do not cache component
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {}

  onDeletePlaylist() {
    if (confirm('Are you sure to delete this playlist?')) {
      this.playlistsService.deletePlaylist(this.playlist).subscribe(() => {
        this.playlistsService.removePlaylistFromSidebar(this.playlist);
      });
      this.router.navigate(['user', this.currentUser.username]);
      this.alertService.success(
        'Playlist has been successfully deleted',
        this.options,
      );
    }
  }

  ngOnDestroy() {
    this.playlistSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
