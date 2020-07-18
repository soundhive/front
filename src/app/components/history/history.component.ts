import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listening } from 'src/app/models/listening';
import { Pagination } from 'src/app/models/pagination/pagination';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  listenings: Pagination<Listening>;
  currentPage = 1;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.listenings = this.route.snapshot.data.listenings;
  }

  onPaginationUpdate(event) {
    this.currentPage = event.page;
    this.userService
      .getTracksHistory(this.authService.username, event.page)
      .subscribe((res) => {
        this.listenings = res;
      });
  }
}
