import { Component, OnInit } from '@angular/core';
import { Listening } from 'src/app/models/listening';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  listenings: Listening[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.listenings = this.route.snapshot.data.listenings.items;
  }
}
