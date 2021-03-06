import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/models/pagination/pagination';
import { Track } from 'src/app/models/track';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-my-tracks',
  templateUrl: './my-tracks.component.html',
  styleUrls: ['./my-tracks.component.scss'],
})
export class MyTracksComponent implements OnInit {
  tracks: Pagination<Track>;
  currentPage = 1;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.tracks = this.route.snapshot.data.tracks;
  }

  onPaginationUpdate(event) {
    this.currentPage = event.page;
    this.userService
      .getUserTracks(this.authService.username, event.page, 8)
      .subscribe((res) => {
        this.tracks = res;
      });
  }
}
