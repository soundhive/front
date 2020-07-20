import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/models/album';
import { Pagination } from 'src/app/models/pagination/pagination';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.scss'],
})
export class MyAlbumsComponent implements OnInit {
  s3Bucket: string;
  s3Endpoint: string;

  albums: Pagination<Album>;
  currentPage = 1;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }

  ngOnInit(): void {
    this.albums = this.route.snapshot.data.albums;
  }

  onPaginationUpdate(event) {
    this.currentPage = event.page;
    this.userService
      .getUserAlbums(this.authService.username, event.page)
      .subscribe((res) => {
        this.albums = res;
      });
  }
}
