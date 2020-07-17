import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Track } from 'src/app/models/track';
import { ChartsService } from '../services/charts.service';

@Injectable({
  providedIn: 'root',
})
export class ChartingTracksResolve implements Resolve<Track[]> {
  constructor(private chartsService: ChartsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Track[]> {
    return this.chartsService.getChartingTracks();
  }
}
