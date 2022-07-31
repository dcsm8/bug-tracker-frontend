import { CreateCommentDto } from '@interfaces/comment.interface';
import { Comment } from '@interfaces/comment.interface';
import { apiClient } from './api';

export const create = async (comment: CreateCommentDto): Promise<Comment> => {
  const response = await apiClient.post<Comment>('/comments', comment);
  return response.data;
};

export const remove = async (comment: Partial<Comment>): Promise<Comment> => {
  const response = await apiClient.delete<Comment>(`/comments/${comment.id}`);
  return response.data;
};
