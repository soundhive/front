import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private apiService: ApiService) {}

  getAlbum(id: string): Observable<Album> {
    return this.apiService.getAlbum(id);
  }
}
