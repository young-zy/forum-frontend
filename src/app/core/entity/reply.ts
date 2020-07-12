import {User} from './user';

export interface Reply {
  replyId: number;
  replyContent: string;
  replyTime: string;
  lastEditTime: string;
  priority: number;
  bestAnswer?: boolean;
  upVote: number;
  user: User;
  vote: number;
}
