import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Track } from 'src/app/models/track';
import { Listening } from '../models/listening';
import { HistoryService } from '../services/history.service';

@Injectable({
  providedIn: 'root',
})
export class UserHistoryResolve implements Resolve<{ items: Listening[] }> {
  constructor(
    private historyService: HistoryService,
    private authService: AuthService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<{ items: Listening[] }> {
    return this.historyService.getForUser(this.authService.username);
  }
}
