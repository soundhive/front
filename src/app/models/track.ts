import { Album } from './album';
import { User } from './user';

export class Track {
  id: string;
  title: string;
  description: string;
  genre: string;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
  duration: number;
  album: Album;
  user: User;
  favorited: boolean;
  listeningCount: number;
  downloadable: boolean;
  favoriteCount: number;
}
