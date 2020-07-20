import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { S3Service } from 'src/app/services/s3.service';

@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.scss'],
})
export class AlbumPreviewComponent implements OnInit {
  @Input() album: Album;

  constructor(public s3Service: S3Service) {}

  ngOnInit(): void {}
}
