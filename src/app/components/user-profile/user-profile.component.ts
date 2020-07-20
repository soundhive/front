import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/models/album';
import { Pagination } from 'src/app/models/pagination/pagination';
import { Track } from 'src/app/models/track';
import { S3Service } from 'src/app/services/s3.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  tracks: Pagination<Track>;
  albums: Pagination<Album>;
  self = false;
  currentTracksPage = 1;
  currentAlbumsPage = 1;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public s3Service: S3Service,
  ) {
    // call ngOnInit again when router routes to this component
    // otherwise the resolve data will not be affected to component properties.
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.tracks = this.route.snapshot.data.tracks;
    this.albums = this.route.snapshot.data.albums;

    // Is the user viewing their own profile?
    this.self = this.user.username === this.authService.username;
  }

  follow() {
    this.userService.followUser(this.user).subscribe(() => {
      this.user.following = true;
    });
  }

  unfollow() {
    this.userService.unfollowUser(this.user).subscribe(() => {
      this.user.following = false;
    });
  }

  changeTracksPage(event) {
    this.currentTracksPage = event.page;
    this.userService
      .getUserTracks(this.authService.username, event.page, 10)
      .subscribe((res) => {
        this.tracks = res;
      });
  }

  changeAlbumsPage(event) {
    this.currentAlbumsPage = event.page;
    this.userService
      .getUserAlbums(this.authService.username, event.page, 9)
      .subscribe((res) => {
        this.albums = res;
      });
  }
}
