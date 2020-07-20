import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album';
import { Pagination } from 'src/app/models/pagination/pagination';
import { Track } from 'src/app/models/track';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users: User[];
  tracks: Pagination<Track>;
  albums: Pagination<Album>;
  s3Bucket: string;
  s3Endpoint: string;

  constructor(private route: ActivatedRoute) {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }

  ngOnInit(): void {
    this.users = this.route.snapshot.data.users;
    this.users.slice(0, 9);
    this.tracks = this.route.snapshot.data.tracks;
    this.albums = this.route.snapshot.data.albums;
  }
}
