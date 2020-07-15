import { Injectable, Output, EventEmitter } from '@angular/core';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  @Output() aClickedEvent = new EventEmitter<Track>();

  constructor() {}

  AClicked(track: Track) {
    this.aClickedEvent.emit(track);
  }
}
