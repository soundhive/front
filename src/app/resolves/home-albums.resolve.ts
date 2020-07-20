import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { Pagination } from '../models/pagination/pagination';
import { AlbumService } from '../services/album.service';

@Injectable({
  providedIn: 'root',
})
export class HomeAlbumsResolve implements Resolve<Pagination<Album>> {
  constructor(private trackService: AlbumService) {}

  resolve(): Observable<Pagination<Album>> {
    return this.trackService.getAlbums(1, 4);
  }
}
