import { User } from './user-interface';

export interface Task {
  position: number;
  id: number;
  title: string;
  priority: PriorityType;
  status: StatusType;
  notificationStatus: NotificationStatusType;
  category: CategoryType;
  reproducible: ReproducibleType;
  description: string;
  release: string;
  createdBy: User;
  assignedTo: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdatePositionDto {
  backlog: number[];
  in_progress: number[];
  testing: number[];
  complete: number[];
}

export enum CategoryType {
  ISSUE = 'issue',
  FEATURE = 'feature',
  INQUIRY = 'inquiry',
}

export enum NotificationStatusType {
  NOTIFIED = 'notified',
  NOT_NOTIFIED = 'not_notified',
}

export enum ReproducibleType {
  ALWAYS = 'always',
  SOMETIMES = 'sometimes',
  RARELY = 'rarely',
  UNABLE = 'unable',
  NOT_APPLICABLE = 'not_applicable',
}

export enum PriorityType {
  NONE = 'none',
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum StatusType {
  BACKLOG = 'backlog',
  IN_PROGRESS = 'in_progress',
  TESTING = 'testing',
  COMPLETE = 'complete',
}
