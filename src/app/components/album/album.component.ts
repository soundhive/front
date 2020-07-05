import { Component, OnInit, Input } from '@angular/core';
import { Album } from 'src/app/models/album';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input() album: Album;
  s3Bucket: string;
  s3Endpoint: string;

  constructor() {
    this.s3Bucket = environment.s3_bucket;
    this.s3Endpoint = environment.s3_endpoint;
  }

  ngOnInit(): void {
  }

}
