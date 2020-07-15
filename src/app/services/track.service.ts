import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Track } from '../models/track';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(private apiService: ApiService) {}

  getTrackStats(track: Track): Observable<{ listenings: number }> {
    return this.apiService.getTrackStats(track);
  }
}
