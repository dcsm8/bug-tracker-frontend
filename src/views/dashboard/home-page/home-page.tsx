import Board, { moveCard, removeCard } from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import {
  Alert,
  AlertIcon,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ViewTask } from '@components/task/view-task/view-task';
import { Task } from '@interfaces/task-interface';
import {
  createBoard,
  findAll,
  getPositions,
  remove,
  updatePositions,
} from '@services/tasks-service';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const Home = () => {
  const { isOpen, onOpen: onOpenViewTask, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const [board, setBoard] = useState<Board>({});
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { isLoading, data, isError } = useQuery(['tasks'], findAll, {
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

    const updatedPositions = getPositions(updatedBoard);
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

  const renderCard = (task: Task, { dragging }) => (
    <Flex
      mt='10px'
      dragging={dragging}
      flexDirection='column'
      p='25px'
      borderRadius='15px'
      w='270px'
      onClick={() => openTask(task)}
    >
      <Text fontSize='md'>{task.title}</Text>
    </Flex>
  );

  return (
    <>
      <Board
        disableColumnDrag
        onCardDragEnd={onCardDragEnd}
        renderCard={renderCard}
      >
        {board}
      </Board>
      <ViewTask
        isOpen={isOpen}
        onClose={onClose}
        onRemoveCard={onRemoveCard}
        selectedTask={selectedTask}
      />
    </>
  );
};

export default Home;
