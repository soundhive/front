import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track';
import { PlayerService } from 'src/app/services/player.service';
import { TrackService } from 'src/app/services/track.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  @Input() track: Track;

  s3Bucket: string;
  s3Endpoint: string;

  constructor(
    public playerService: PlayerService,
    public trackService: TrackService,
  ) {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }

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
