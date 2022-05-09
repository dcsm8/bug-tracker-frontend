import { Board, Card, Column } from 'interfaces/board-interface';
import { Task } from 'interfaces/task-interface';
import { v4 as uuid } from 'uuid';
import { apiClient } from './api';

export const findAll = async (): Promise<Board> => {
  const response = await apiClient.get<Task[]>('/tasks');
  return toColumns(response.data);
};

const toColumns = (tasks: Task[]): Board => {
  const cards: Card[] = [];

  tasks.forEach((task) => {
    cards.push({
      id: uuid(),
      title: task.title,
      description: task.shortDescription,
    });
  });

  const column: Column = {
    id: uuid(),
    cards: cards,
    title: 'Backlog',
  };

  const columns: Column[] = [column];

  const board: Board = {
    columns: columns,
  };

  return board;
};
