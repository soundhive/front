import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Favorite } from 'src/app/models/favorite';
import { Pagination } from 'src/app/models/pagination/pagination';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-favorite-tracks',
  templateUrl: './favorite-tracks.component.html',
  styleUrls: ['./favorite-tracks.component.scss'],
})
export class FavoriteTracksComponent implements OnInit {
  favorites: Pagination<Favorite>;
  currentPage = 1;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.favorites = this.route.snapshot.data.favorites;
    console.log(this.favorites);
  }

  onPaginationUpdate(event) {
    this.currentPage = event.page;
    this.userService
      .getFavoriteTracks(this.authService.username, event.page)
      .subscribe((res) => {
        this.favorites = res;
      });
  }
}
