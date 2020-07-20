import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Album } from '../models/album';
import { Pagination } from '../models/pagination/pagination';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FollowedUsersAlbumsResolve implements Resolve<Pagination<Album>> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  resolve(): Observable<Pagination<Album>> {
    return this.userService.getFollowedUsersAlbums(
      this.authService.username,
      1,
      8,
    );
  }
}
