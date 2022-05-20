import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Task } from '@interfaces/task-interface';
import { findAll, remove, update } from '@services/tasks-service';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const Home = () => {
  const queryClient = useQueryClient();
  const [board, setBoard] = useState<Board>({});
  const { isLoading, data, isError } = useQuery(['tasks'], findAll, {
    onSuccess: (data) => {
      setBoard(data);
    },
  });

  const { mutateAsync: updateTask } = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

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
    const updatedTask: Partial<Task> = {
      id: card.id,
      status: destination.toColumnId,
    };
    await updateTask(updatedTask);
  };

  const onRemoveCard = async (card: Task) => {
    await deleteTask(card);
  };

  const renderCard = (card: Task, { dragging }) => (
    <Flex
      mt='10px'
      dragging={dragging}
      flexDirection='column'
      p='25px'
      borderRadius='15px'
      w='270px'
    >
      <Text fontSize='md'>{card.title}</Text>
      <Button type='button' onClick={() => onRemoveCard(card)}>
        Remove Card
      </Button>
    </Flex>
  );

  return (
    <Board
      disableColumnDrag
      onCardDragEnd={onCardDragEnd}
      renderCard={renderCard}
    >
      {board}
    </Board>
  );
};

export default Home;
