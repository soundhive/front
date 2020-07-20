import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Track } from 'src/app/models/track';
import { PlayerService } from 'src/app/services/player.service';
import { S3Service } from 'src/app/services/s3.service';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  track: Track = null;

  playTrackSub: Subscription;
  loadTrackSub: Subscription;

  constructor(
    public playerService: PlayerService,
    public trackService: TrackService,
    public s3Service: S3Service,
  ) {}

  ngOnInit(): void {
    const previousTrack = localStorage.getItem('current_track');

    // Load track that the user was playing last
    if (previousTrack) {
      this.trackService.getTrack(previousTrack).subscribe((track) => {
        if (track) {
          this.track = track;
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
    this.playTrackSub = this.playerService.playTrackEvent.subscribe(
      (track: Track) => {
        if (this.track?.id === track.id) {
          player.play();
        } else {
          localStorage.setItem('current_track', track.id);

          this.track = track;

          // Once the track has been loaded, play it
          player.onloadeddata = () => {
            player.play();
          };
        }
      },
    );

    // User clicks on title
    this.loadTrackSub = this.playerService.loadTrackEvent.subscribe(
      (track: Track) => {
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
      },
    );
  }

  onEnded() {
    // This event is not reliable!
    // https://github.com/vmudigal/ngx-audio-player/issues/66
    // See the `pause` eventListener above instead.
  }

  ngOnDestroy() {
    this.playTrackSub.unsubscribe();
    this.loadTrackSub.unsubscribe();
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
