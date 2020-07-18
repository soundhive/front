import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  tracks: Track[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tracks = this.route.snapshot.data.tracks;
  }
}
