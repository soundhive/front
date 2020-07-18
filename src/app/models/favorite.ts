import { Track } from './track';
import { User } from './user';

export class Favorite {
  id: string;
  favoritedAt: Date;
  user: User;
  track: Track;
}
