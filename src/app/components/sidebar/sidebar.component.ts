import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  homeLink = '/home';
  subscriptionsLink = '/subscriptions';
  chartsLink = '/charts';
  discoverLink = '/discover';
  mySongsLink = '/my-songs';
  myAlbumsLink = '/my-albums';
  myActivityLink = '/my-activity';

  constructor() { }

  ngOnInit(): void {
  }

}
