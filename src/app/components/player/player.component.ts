import { Component, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track';
import { PlayerService } from 'src/app/services/player.service';
import { TrackService } from 'src/app/services/track.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  s3Bucket: string;
  s3Endpoint: string;

  track: Track = null;

  constructor(
    public playerService: PlayerService,
    public trackService: TrackService,
  ) {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }

  ngOnInit(): void {
    const previousTrack = localStorage.getItem('current_track');

    // Load track that the user was playing last
    if (previousTrack) {
      this.trackService.getTrack(previousTrack).subscribe((track) => {
        if (track) {
          this.track = track;

          this.trackService.isTrackFavorited(this.track).subscribe((res) => {
            this.track.favorited = res.favorited;
          });
        }
      });
    }

    const player = document.getElementsByTagName(
      'audio',
    )[0] as HTMLAudioElement;

    player.addEventListener('pause', () => {
      // Workaround because the `ended` event is not reliable.
      if (Math.round(player.currentTime) === this.track.duration) {
        this.trackService.addListening(this.track).subscribe(() => {});
      }
    });

    // User clicks on play button
    this.playerService.playTrackEvent.subscribe((track: Track) => {
      localStorage.setItem('current_track', track.id);

      this.track = track;

      // Once the track has been loaded, play it
      player.onloadeddata = () => {
        player.play();
      };
    });

    // User clicks on title
    this.playerService.loadTrackEvent.subscribe((track: Track) => {
      localStorage.setItem('current_track', track.id);

      const currentlyPlaying = !player.pause;

      this.track = track;

      // If not track was playing, we only load the track into the player
      if (currentlyPlaying) {
        // Once the track has been loaded, play it
        player.onloadeddata = () => {
          player.play();
        };
      }
    });
  }

  onEnded() {
    // This event is not reliable!
    // https://github.com/vmudigal/ngx-audio-player/issues/66
    // See the `pause` eventListener above instead.
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
