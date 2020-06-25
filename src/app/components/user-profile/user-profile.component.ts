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
  tracks: Track[] = [
    {
      id: 'd71ee1e0-9185-4f0b-8153-b2a6cb10da56',
      title: 'TT',
      description: 'lolz',
      genre: 'lolz',
      filename: 'tracks/aaa91e0d14587daec7b2b1f8cbaa7c1e.mp3',
      createdAt: new Date('2020-06-21T17:53:50.546Z'),
      updatedAt: new Date('2020-06-21T17:53:50.546Z'),
    },
    {
      id: 'd71ee1e0-9185-4f0b-8153-b2a6cb10da56',
      title: 'FANCY YOU',
      description: 'lolz',
      genre: 'lolz',
      filename: 'tracks/aaa91e0d14587daec7b2b1f8cbaa7c1e.mp3',
      createdAt: new Date('2020-06-21T17:53:50.546Z'),
      updatedAt: new Date('2020-06-21T17:53:50.546Z'),
    }
  ];

  constructor(
    public userService: UserService,
    private actRoute: ActivatedRoute,
  ) {
    const username = this.actRoute.snapshot.paramMap.get('username');
    this.userService.getUser(username).subscribe(res => {
      this.currentUser = res;
    });
  }

  ngOnInit() { }
}
