import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../models/pagination/pagination';
import { Track } from '../models/track';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(private apiService: ApiService) {}

  addListening(track: Track): Observable<void> {
    return this.apiService.postTrackListening(track);
  }

  getTrack(id: string): Observable<Track> {
    return this.apiService.getTrack(id);
  }
  getTracks(page?: number, limit?: number): Observable<Pagination<Track>> {
    return this.apiService.getTracks(page, limit);
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
