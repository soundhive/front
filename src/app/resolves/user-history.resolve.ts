import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Listening } from '../models/listening';
import { Pagination } from '../models/pagination/pagination';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserHistoryResolve implements Resolve<Pagination<Listening>> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  resolve(): Observable<Pagination<Listening>> {
    return this.userService.getTracksHistory(this.authService.username);
  }
}
