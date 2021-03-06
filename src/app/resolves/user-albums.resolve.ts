import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Album } from 'src/app/models/album';
import { UserService } from 'src/app/services/user.service';
import { Pagination } from '../models/pagination/pagination';

@Injectable({
  providedIn: 'root',
})
export class UserAlbumsResolve implements Resolve<Pagination<Album>> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pagination<Album>> {
    return this.userService.getUserAlbums(route.params.username, 1, 9);
  }
}
