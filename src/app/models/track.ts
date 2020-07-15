// import { User } from './user';

import { User } from './user';

export class Track {
  id: string;
  title: string;
  description: string;
  genre: string;
  filename: string;
  // listenings: Listening[];
  createdAt: Date;
  updatedAt: Date;
  // album: Album;
  user: User;
}
