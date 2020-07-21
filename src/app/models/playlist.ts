import { User } from './user';
import { Track } from './track';

export class Playlist {
  id: string;
  title: string;
  description?: string;
  coverFilename: string;
  createdAt: Date;
  updatedAt: Date;
  tracks: Track[];
  user: User;
}
