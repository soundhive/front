import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/models/album';
import { Track } from 'src/app/models/track';
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
  tracks: Track[];
  albums: Album[];
  self = false;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // call ngOnInit again when router routes to this component
    // otherwise the resolve data will not be affected to component properties.
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.tracks = this.route.snapshot.data.tracks.items;
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
}
