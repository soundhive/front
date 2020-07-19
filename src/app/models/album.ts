import { Track } from 'ngx-audio-player';
import { User } from './user';

export class Album {
  id: string;
  title: string;
  description?: string;
  coverFilename: string;
  createdAt: Date;
  updatedAt: Date;
  tracks: Track[];
  user: User;
  duration: number;
}
