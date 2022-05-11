import { Board, Card, Column } from '@interfaces/board-interface';
import { StatusType, Task } from '@interfaces/task-interface';
import { v4 as uuid } from 'uuid';
import { apiClient } from './api';

export const findAll = async (): Promise<Board> => {
  const response = await apiClient.get<Task[]>('/tasks');
  return createBoard(response.data);
};

const createBoard = (tasks: Task[]): Board => {
  const backlogCards: Card[] = [];
  const inProgressCards: Card[] = [];
  const testingCards: Card[] = [];
  const completeCards: Card[] = [];

  tasks.forEach((task) => {
    const card: Card = {
      id: uuid(),
      title: task.title,
      description: task.shortDescription,
    };

    switch (task.status) {
      case StatusType.BACKLOG:
        backlogCards.push(card);
        break;
      case StatusType.IN_PROGRESS:
        inProgressCards.push(card);
        break;
      case StatusType.TESTING:
        testingCards.push(card);
        break;
      case StatusType.COMPLETE:
        completeCards.push(card);
        break;
    }
  });

  const backlogColumn: Column = {
    id: StatusType.BACKLOG,
    cards: backlogCards,
    title: 'Backlog',
  };

  const inProgressColumn: Column = {
    id: StatusType.IN_PROGRESS,
    cards: inProgressCards,
    title: 'In Progress',
  };

  const testingColumn: Column = {
    id: StatusType.TESTING,
    cards: testingCards,
    title: 'Testing',
  };

  const completeColumn: Column = {
    id: StatusType.COMPLETE,
    cards: completeCards,
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
