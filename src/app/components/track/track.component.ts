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
  msbapTitle = 'Audio Title';
  msbapAudioUrl = 'Link to audio URL';
  msaapDisplayVolumeControls = true;

  msbapDisplayTitle = false;

  s3Bucket: string;
  s3Endpoint: string;

  constructor(public playerService: PlayerService) {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }

  ngOnInit(): void {}

  onClick(track: Track) {
    console.log(track);
    this.playerService.AClicked(track);
  }
}
