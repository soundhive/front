import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/track';
import { environment } from 'src/environments/environment';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  @Input() track: Track;

  s3Bucket: string;
  s3Endpoint: string;

  constructor(public playerService: PlayerService) {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }

  ngOnInit(): void {}

  onClick(track: Track) {
    this.playerService.AClicked(track);
  }
}
