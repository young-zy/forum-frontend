import { User } from './user';
import { Reply } from './reply';

export interface Thread {
  sectionId: number;
  tid: number;
  title: string;
  lastReplyTime: string;
  postTime: string;
  author: User;
  question: boolean;
  hasBestAnswer: boolean;
  replies: Reply[];
}
