import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Album } from 'src/app/models/album';
import { UserService } from 'src/app/services/user.service';
import { Pagination } from '../models/pagination/pagination';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MyAlbumsResolve implements Resolve<Pagination<Album>> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pagination<Album>> {
    return this.userService.getUserAlbums(this.authService.username, 1, 9);
  }
}
