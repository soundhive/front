import { Component, OnInit, Input } from '@angular/core';
import { Listening } from 'src/app/models/listening';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from 'src/app/services/history.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ListeningPagination } from 'src/app/models/pagination/listening-pagination';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  listenings: ListeningPagination;
  currentPage = 1;

  constructor(
    private route: ActivatedRoute,
    public historyService: HistoryService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.listenings = this.route.snapshot.data.listenings;
  }

  onPaginationUpdate(event) {
    this.currentPage = event.page;
    this.historyService
      .getForUser(this.authService.username, event.page)
      .subscribe((res) => {
        this.listenings = res;
      });
  }
}
