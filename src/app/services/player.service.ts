import { Injectable, Output, EventEmitter } from '@angular/core';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  @Output() playTrackEvent = new EventEmitter<Track>();
  @Output() loadTrackEvent = new EventEmitter<Track>();

  constructor() {}

  PlayTrack(track: Track) {
    this.playTrackEvent.emit(track);
  }

  LoadTrack(track: Track) {
    this.loadTrackEvent.emit(track);
  }
}
