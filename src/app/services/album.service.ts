import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { Pagination } from '../models/pagination/pagination';
import { Track } from '../models/track';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private apiService: ApiService) {}

  getAlbum(id: string): Observable<Album> {
    return this.apiService.getAlbum(id);
  }

  getAlbums(page?: number, limit?: number): Observable<Pagination<Album>> {
    return this.apiService.getAlbums(page, limit);
  }

  getAlbumTracks(
    id: string,
    page?: number,
    limit?: number,
  ): Observable<Pagination<Track>> {
    return this.apiService.getAlbumTracks(id, page, limit);
  }
}
