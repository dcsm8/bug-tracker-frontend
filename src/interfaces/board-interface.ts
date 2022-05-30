import { Task } from 'interfaces/task-interface';
export interface Board {
  columns: Column[];
}

export interface Column {
  id: number | string;
  color: string;
  title: string;
  labelBg: string;
  cards: Task[];
}
