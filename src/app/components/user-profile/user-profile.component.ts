import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  currentUser: User;
  tracks: Track[];
  albums: Album[];

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.currentUser = this.route.snapshot.data.user;
    this.tracks = this.route.snapshot.data.tracks.items;
    this.albums = this.route.snapshot.data.albums;
  }
}
