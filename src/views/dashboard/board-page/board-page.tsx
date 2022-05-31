import Board, { moveCard, removeCard } from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import {
  Alert,
  AlertIcon,
  Box,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { CardTask } from '@components/kanban-board/card-task';
import { ColumnHeader } from '@components/kanban-board/column-header';
import { ViewTask } from '@components/task/view-task/view-task';
import { Task } from '@interfaces/task-interface';
import {
  createBoard,
  findAll,
  getPositions,
  remove,
  updatePositions,
} from '@services/tasks-service';
import { useTaskStore } from '@store/task-store';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import './board-page.css';

export const BoardPage = () => {
  const { isOpen, onOpen: onOpenViewTask, onClose } = useDisclosure();
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);
  const queryClient = useQueryClient();
  const [board, setBoard] = useState<Board>({});

  const { isLoading, isError } = useQuery(['tasks'], findAll, {
    onSuccess: (data) => {
      setBoard(createBoard(data));
    },
  });

  const { mutateAsync: updateTaskPositions } = useMutation(updatePositions);

  const { mutateAsync: deleteTask } = useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <Alert status='error'>
        <AlertIcon />
        There was a problem loading your board.
      </Alert>
    );

  const onCardDragEnd = async (card, source, destination) => {
    const updatedBoard = moveCard(board, source, destination);
    setBoard(updatedBoard);

    const updatedPositions = getPositions(
      updatedBoard,
      source.fromColumnId,
      destination.toColumnId,
    );
    await updateTaskPositions(updatedPositions);
  };

  const onRemoveCard = async (card: Task) => {
    const updatedBoard = removeCard(board, { id: card.status }, card);
    setBoard(updatedBoard);
    onClose();

    await deleteTask(card);
  };

  const openTask = (task: Task) => {
    setSelectedTask(task);
    onOpenViewTask();
  };

  return (
    <Box bg='white'>
      <Board
        disableColumnDrag
        onCardDragEnd={onCardDragEnd}
        renderCard={(task, props) => (
          <CardTask task={task} openTask={openTask} props={props} />
        )}
        renderColumnHeader={ColumnHeader}
      >
        {board}
      </Board>
      <ViewTask isOpen={isOpen} onClose={onClose} onRemoveCard={onRemoveCard} />
    </Box>
  );
};
