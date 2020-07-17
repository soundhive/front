import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../models/track';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private apiService: ApiService) {}

  getChartingTracks(): Observable<Track[]> {
    return this.apiService.getChartingTracks();
  }
}
