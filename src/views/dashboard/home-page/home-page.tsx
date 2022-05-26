import Board, { moveCard, removeCard } from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import {
  Alert,
  AlertIcon,
  Box,
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
import { useTaskStore } from '@store/task-store';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import './home-page.css';

const Home = () => {
  const { isOpen, onOpen: onOpenViewTask, onClose } = useDisclosure();
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);
  const queryClient = useQueryClient();
  const [board, setBoard] = useState<Board>({});

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
      p='10px 15px'
      borderRadius='7px'
      borderColor='#EFF0F1'
      bg='white'
      boxShadow='base'
      maxW='270px'
      minW='270px'
      onClick={() => openTask(task)}
    >
      <Text fontSize='md' fontWeight='bold'>
        {task.title}
      </Text>
    </Flex>
  );

  const renderColumnHeader = ({ title, color }) => (
    <Box bg={color} p='6px 12px' borderRadius='7px' maxW='270px' minW='270px'>
      <Text fontSize='sm' fontWeight='semibold' color='white'>
        {title}
      </Text>
    </Box>
  );

  return (
    <Box bg='white'>
      <Board
        disableColumnDrag
        onCardDragEnd={onCardDragEnd}
        renderCard={renderCard}
        renderColumnHeader={renderColumnHeader}
      >
        {board}
      </Board>
      <ViewTask isOpen={isOpen} onClose={onClose} onRemoveCard={onRemoveCard} />
    </Box>
  );
};

export default Home;
