import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album';
import { Pagination } from 'src/app/models/pagination/pagination';
import { Track } from 'src/app/models/track';
import { User } from 'src/app/models/user';
import { S3Service } from 'src/app/services/s3.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit {
  followedUsers: Pagination<User>;
  tracks: Pagination<Track>;
  albums: Pagination<Album>;

  constructor(private route: ActivatedRoute, public s3Service: S3Service) {}

  ngOnInit(): void {
    this.followedUsers = this.route.snapshot.data.followedUsers;
    this.tracks = this.route.snapshot.data.tracks;
    this.albums = this.route.snapshot.data.albums;
  }
}
