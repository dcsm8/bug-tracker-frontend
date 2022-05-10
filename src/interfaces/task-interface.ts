import { User } from './user-interface';

export interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  notificationStatus: string;
  category: string;
  reproducible: string;
  shortDescription: string;
  longDescription: string;
  release: string;
  createdBy: User;
  assignedTo: User;
  createdAt: Date;
  updatedAt: Date;
}
