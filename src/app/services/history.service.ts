import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ListeningPagination } from '../models/pagination/listening-pagination';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private apiService: ApiService) {}

  getForUser(
    username: string,
    page?: number,
    limit?: number,
  ): Observable<ListeningPagination> {
    return this.apiService.getListeningsForUser(username, page, limit);
  }
}
