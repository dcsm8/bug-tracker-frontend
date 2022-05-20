import { Task } from './../interfaces/task-interface';

export const compareTasks = (a: Task, b: Task) => {
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
};
