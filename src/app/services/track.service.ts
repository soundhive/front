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

  addListening(track: Track): Observable<void> {
    return this.apiService.postTrackListening(track);
  }

  getTrack(id: string): Observable<Track> {
    return this.apiService.getTrack(id);
  }
  isTrackFavorited(track: Track): Observable<{ favorited: boolean }> {
    return this.apiService.getIsTrackFavorited(track);
  }
  favoriteTrack(track: Track): Observable<any> {
    return this.apiService.postFavoriteTrack(track);
  }
  unFavoriteTrack(track: Track): Observable<any> {
    return this.apiService.deleteFvoriteTrack(track);
  }
}
