import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Pagination } from '../models/pagination/pagination';
import { User } from '../models/user';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserFollowingsResolve implements Resolve<Pagination<User>> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  resolve(): Observable<Pagination<User>> {
    return this.userService.getFollowings(this.authService.username, 1, 9);
  }
}
