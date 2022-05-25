import { Task } from '@interfaces/task-interface';
import create, { SetState } from 'zustand';

interface TaskStore {
  selectedTask: Task | null;
  setSelectedTask: (task: Task) => void;
}

export const useTaskStore = create<TaskStore>((set: SetState<TaskStore>) => ({
  selectedTask: null,
  setSelectedTask: (task) => set(() => ({ selectedTask: task })),
}));
