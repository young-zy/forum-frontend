import {Thread} from './thread';
import {Reply} from './reply';
import {Section} from './section';
import {User} from './user';

export interface Response {
  success: boolean;
  reason: string;
  timestamp: string;
  list: Thread[];
  token: string;
  reply: Reply;
  searches: Thread;
  sections: Section[];
  section: Section;
  thread: Thread;
  users: User[];
  user: User;
}
