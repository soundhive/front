// import { User } from './user';

import { User } from './user';
import { Album } from './album';

export class Track {
  id: string;
  title: string;
  description: string;
  genre: string;
  filename: string;
  // listenings: Listening[];
  createdAt: Date;
  updatedAt: Date;
  duration: number;
  album: Album;
  user: User;
}
