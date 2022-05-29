import { Area } from './area-interface';
import { User } from './user-interface';

export interface Task {
  id: number;
  position: number;
  title: string;
  createdBy: User;
  status: StatusType;
  priority?: PriorityType;
  category?: CategoryType;
  reproducible?: ReproducibleType;
  description?: string;
  area?: Area;
  assignedTo?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDto {
  title: string;
  priority?: string;
  category?: string;
  reproducible?: string;
  assignedToId?: number;
  areaId?: number;
  description?: string;
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
