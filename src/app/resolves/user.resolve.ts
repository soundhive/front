import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolve implements Resolve<User> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.username);
  }
}
