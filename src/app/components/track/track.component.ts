import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track';
import { PlayerService } from 'src/app/services/player.service';
import { S3Service } from 'src/app/services/s3.service';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  @Input() track: Track;

  constructor(
    public playerService: PlayerService,
    public trackService: TrackService,
    public s3Service: S3Service,
  ) {}

  ngOnInit(): void {}

  onPlayButtonClick(track: Track) {
    this.playerService.PlayTrack(track);
  }

  onTitleClick(track: Track) {
    this.playerService.LoadTrack(track);
  }

  favoriteTrack() {
    this.trackService.favoriteTrack(this.track).subscribe((res) => {});
    this.track.favorited = true;
  }
  unfavoriteTrack() {
    this.trackService.unFavoriteTrack(this.track).subscribe();
    this.track.favorited = false;
  }
}
