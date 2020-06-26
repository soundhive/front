import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../models/user';
import { Track } from 'src/app/models/track';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  currentUser: User;
  tracks: Track[];

  constructor(
    public userService: UserService,
    private actRoute: ActivatedRoute,
  ) {
    let username: string;
    if (this.actRoute.snapshot.paramMap.get('username')) {
      username = this.actRoute.snapshot.paramMap.get('username');
    } else {
      username = localStorage.getItem('username');
    }

    this.userService.getUser(username).subscribe(res => {
      this.currentUser = res;
    });

    this.userService.getUserTracks(username).subscribe(res => {
      this.tracks = res;
    });
  }

  ngOnInit() { }
}
