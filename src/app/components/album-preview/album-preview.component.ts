import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-album',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.scss'],
})
export class AlbumPreviewComponent implements OnInit {
  @Input() album: Album;
  s3Bucket: string;
  s3Endpoint: string;

  constructor() {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }

  ngOnInit(): void {}
}
