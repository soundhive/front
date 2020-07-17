import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolve implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const userObservable = this.userService.getUser(route.params.username);

    // If user not found, display not found component
    userObservable.subscribe((res) => {
      if (!res) {
        this.router.navigate(['/404'], {
          skipLocationChange: true,
        });
      } else {
      }
    });

    return userObservable;
  }
}
