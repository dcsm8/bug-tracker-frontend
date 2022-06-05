import { User } from './user-interface';

export interface Comment {
  id: number;
  user: User;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  task: number;
}

export interface CreateCommentDto {
  user: number;
  task: number;
  text: string;
}
