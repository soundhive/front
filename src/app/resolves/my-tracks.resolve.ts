import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Track } from 'src/app/models/track';
import { UserService } from 'src/app/services/user.service';
import { Pagination } from '../models/pagination/pagination';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MyTracksResolve implements Resolve<Pagination<Track>> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Pagination<Track>> {
    return this.userService.getUserTracks(this.authService.username, 1, 8);
  }
}
