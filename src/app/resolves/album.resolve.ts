import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Album } from 'src/app/models/album';
import { AlbumService } from '../services/album.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumResolve implements Resolve<Album> {
  constructor(private albumService: AlbumService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Album> {
    const albumObservable = this.albumService.getAlbum(route.params.id);

    // If album not found, display not found component
    albumObservable.subscribe((res) => {
      if (!res) {
        this.router.navigate(['/404'], {
          skipLocationChange: true,
        });
      } else {
      }
    });

    return albumObservable;
  }
}
