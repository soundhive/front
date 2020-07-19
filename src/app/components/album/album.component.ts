import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/models/album';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  album: Album = new Album();
  self = false;
  s3Bucket: string;
  s3Endpoint: string;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // call ngOnInit again when router routes to this component
    // otherwise the resolve data will not be affected to component properties.
    // this.router.routeReuseStrategy.shouldReuseRoute = () => {
    //   return false;
    // };

    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }
  ngOnInit(): void {
    this.album = this.route.snapshot.data.album;

    // Is the user viewing their own profile?
    this.self = this.album.user.username === this.authService.username;
  }
}
