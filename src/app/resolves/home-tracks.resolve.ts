import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Track } from 'src/app/models/track';
import { Pagination } from '../models/pagination/pagination';
import { TrackService } from '../services/track.service';

@Injectable({
  providedIn: 'root',
})
export class HomeTracksResolve implements Resolve<Pagination<Track>> {
  constructor(private trackService: TrackService) {}

  resolve(): Observable<Pagination<Track>> {
    return this.trackService.getTracks(1, 10);
  }
}
