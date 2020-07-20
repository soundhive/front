import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class S3Service {
  constructor() {}

  getURL(path: string) {
    return `${environment.s3_endpoint}/${environment.s3_bucket}/${path}`;
  }
}
