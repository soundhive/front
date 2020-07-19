import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Track } from 'src/app/models/track';
import { Pagination } from '../models/pagination/pagination';
import { AlbumService } from '../services/album.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumTracksResolve implements Resolve<Pagination<Track>> {
  constructor(private albumService: AlbumService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pagination<Track>> {
    return this.albumService.getAlbumTracks(route.params.id, 1, 5);
  }
}
