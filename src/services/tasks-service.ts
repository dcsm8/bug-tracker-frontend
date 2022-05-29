import { UpdatePositionDto, CreateTaskDto } from '@interfaces/task-interface';
import { compareTasks } from '@utils/sort';
import { Board, Column } from '@interfaces/board-interface';
import { StatusType, Task } from '@interfaces/task-interface';
import { apiClient } from './api';

export const findAll = async (): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>('/tasks');
  return response.data;
};

export const findOne = async (id: number): Promise<Task> => {
  const response = await apiClient.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const create = async (task: CreateTaskDto): Promise<Task> => {
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

export const updatePositions = async (
  updatePosition: UpdatePositionDto,
): Promise<void> => {
  const response = await apiClient.patch(
    '/tasks/positions/update',
    updatePosition,
  );
  return response.data;
};

export const createBoard = (tasks: Task[]): Board => {
  const backlogTasks: Task[] = [];
  const inProgressTasks: Task[] = [];
  const testingTasks: Task[] = [];
  const completeTasks: Task[] = [];

  tasks.sort(compareTasks).forEach((task) => {
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
    color: '#D69900',
  };

  const inProgressColumn: Column = {
    id: StatusType.IN_PROGRESS,
    cards: inProgressTasks,
    title: 'In Progress',
    color: '#7F2DE9',
  };

  const testingColumn: Column = {
    id: StatusType.TESTING,
    cards: testingTasks,
    title: 'Testing',
    color: '#00A6DA',
  };

  const completeColumn: Column = {
    id: StatusType.COMPLETE,
    cards: completeTasks,
    title: 'Complete',
    color: '#3BC057',
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

export const getPositions = (board: Board): UpdatePositionDto => {
  const positions: UpdatePositionDto = {
    [StatusType.BACKLOG]: [...board.columns[0].cards.map((obj) => obj.id)],
    [StatusType.IN_PROGRESS]: [...board.columns[1].cards.map((obj) => obj.id)],
    [StatusType.TESTING]: [...board.columns[2].cards.map((obj) => obj.id)],
    [StatusType.COMPLETE]: [...board.columns[3].cards.map((obj) => obj.id)],
  };

  return positions;
};
