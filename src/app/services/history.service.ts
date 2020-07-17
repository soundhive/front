import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { Listening } from '../models/listening';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private apiService: ApiService) {}

  getForUser(username: string): Observable<{ items: Listening[] }> {
    return this.apiService.getListeningsForUser(username);
  }
}
