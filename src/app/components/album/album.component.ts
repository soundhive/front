import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album';
import { Pagination } from 'src/app/models/pagination/pagination';
import { Track } from 'src/app/models/track';
import { AlbumService } from 'src/app/services/album.service';
import { S3Service } from 'src/app/services/s3.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  album: Album = new Album();
  tracks: Pagination<Track>;
  self = false;
  currentPage = 1;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public albumService: AlbumService,
    private route: ActivatedRoute,
    public s3Service: S3Service,
  ) {}
  ngOnInit(): void {
    this.album = this.route.snapshot.data.album;
    this.tracks = this.route.snapshot.data.tracks;

    // Is the user viewing their own profile?
    this.self = this.album.user.username === this.authService.username;
  }

  onPaginationUpdate(event) {
    this.currentPage = event.page;
    this.albumService
      .getAlbumTracks(this.album.id, event.page)
      .subscribe((res) => {
        this.tracks = res;
      });
  }
}
