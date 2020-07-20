import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album';
import { Pagination } from 'src/app/models/pagination/pagination';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.scss'],
})
export class MyAlbumsComponent implements OnInit {
  albums: Pagination<Album>;
  currentPage = 1;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
  ) {}

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
