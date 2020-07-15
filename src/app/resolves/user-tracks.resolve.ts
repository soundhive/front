import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Track } from 'src/app/models/track';

@Injectable({
  providedIn: 'root',
})
export class UserTracksResolve implements Resolve<{ items: Track[] }> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<{ items: Track[] }> {
    return this.userService.getUserTracks(this.authService.username);
  }
}
