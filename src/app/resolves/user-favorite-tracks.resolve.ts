import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Favorite } from '../models/favorite';
import { Pagination } from '../models/pagination/pagination';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserFavoriteTracksResolve
  implements Resolve<Pagination<Favorite>> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  resolve(): Observable<Pagination<Favorite>> {
    return this.userService.getFavoriteTracks(this.authService.username);
  }
}
