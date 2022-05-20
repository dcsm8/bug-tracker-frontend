import { Board, Column } from '@interfaces/board-interface';
import { StatusType, Task } from '@interfaces/task-interface';
import { apiClient } from './api';

export const findAll = async (): Promise<Board> => {
  const response = await apiClient.get<Task[]>('/tasks');
  return createBoard(response.data);
};

export const findOne = async (id: number): Promise<Task> => {
  const response = await apiClient.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const create = async (task: Partial<Task>): Promise<Task> => {
  const response = await apiClient.post<Task>('/tasks', task);
  return response.data;
};

export const remove = async (task: Partial<Task>): Promise<Task> => {
  const response = await apiClient.delete<Task>(`/tasks/${task.id}`);
  return response.data;
};

export const update = async (task: Partial<Task>): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${task.id}`, task);
  return response.data;
};

const createBoard = (tasks: Task[]): Board => {
  const backlogTasks: Task[] = [];
  const inProgressTasks: Task[] = [];
  const testingTasks: Task[] = [];
  const completeTasks: Task[] = [];

  tasks.forEach((task) => {
    switch (task.status) {
      case StatusType.BACKLOG:
        backlogTasks.push(task);
        break;
      case StatusType.IN_PROGRESS:
        inProgressTasks.push(task);
        break;
      case StatusType.TESTING:
        testingTasks.push(task);
        break;
      case StatusType.COMPLETE:
        completeTasks.push(task);
        break;
    }
  });

  const backlogColumn: Column = {
    id: StatusType.BACKLOG,
    cards: backlogTasks,
    title: 'Backlog',
  };

  const inProgressColumn: Column = {
    id: StatusType.IN_PROGRESS,
    cards: inProgressTasks,
    title: 'In Progress',
  };

  const testingColumn: Column = {
    id: StatusType.TESTING,
    cards: testingTasks,
    title: 'Testing',
  };

  const completeColumn: Column = {
    id: StatusType.COMPLETE,
    cards: completeTasks,
    title: 'Complete',
  };

  const columns: Column[] = [
    backlogColumn,
    inProgressColumn,
    testingColumn,
    completeColumn,
  ];

  const board: Board = {
    columns: columns,
  };

  return board;
};
