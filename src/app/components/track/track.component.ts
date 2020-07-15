import { Component, OnInit, Input, Pipe } from '@angular/core';
import { Track } from 'src/app/models/track';
import { environment } from 'src/environments/environment';
import { PlayerService } from 'src/app/services/player.service';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  @Input() track: Track;
  listenings: number;

  s3Bucket: string;
  s3Endpoint: string;

  constructor(
    public playerService: PlayerService,
    public trackService: TrackService,
  ) {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }

  ngOnInit(): void {
    this.trackService.getTrackStats(this.track).subscribe((res) => {
      this.listenings = res.listenings;
    });
  }

  onClick(track: Track) {
    this.playerService.PlayTrack(track);
  }
}
