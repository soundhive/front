import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Album } from 'src/app/models/album';

@Injectable({
  providedIn: 'root',
})
export class UserAlbumsResolve implements Resolve<Album[]> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Album[]> {
    return this.userService.getUserAlbums(this.authService.username);
  }
}
