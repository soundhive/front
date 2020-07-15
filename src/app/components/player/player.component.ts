import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Track } from 'src/app/models/track';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  s3Bucket: string;
  s3Endpoint: string;

  track = null;

  constructor(public playerService: PlayerService) {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }

  ngOnInit(): void {
    this.playerService.aClickedEvent.subscribe(async (track: Track) => {
      // If not initial load (otherwise track is null)
      if (this.track) {
        // Get player <audio> DOM element
        const player = document.getElementsByTagName(
          'audio',
        )[0] as HTMLAudioElement;

        const isCurrentlyPlaying: boolean = !player.paused;

        // Once the track has been loaded
        player.onloadeddata = () => {
          // If player was playing music, let's start the new track
          if (isCurrentlyPlaying) {
            player.play();
          }
        };
      }
      this.track = track;
    });
  }
}
