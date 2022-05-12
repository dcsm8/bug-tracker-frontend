import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { Alert, AlertIcon, Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { Task } from '@interfaces/task-interface';
import { findAll, update } from '@services/tasks-service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const Home = () => {
  const queryClient = useQueryClient();
  const { isLoading, data, isError } = useQuery(['tasks'], findAll);
  const { mutateAsync } = useMutation(['tasks'], update, {
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

  return (
    <Board
      initialBoard={data}
      allowAddCard
      disableColumnDrag
      onCardDragEnd={async (board, card, source, destination) => {
        const updatedTask: Partial<Task> = {
          id: card.id,
          status: destination.toColumnId,
        };
        await mutateAsync(updatedTask);
      }}
      renderCard={({ title, shortDescription }, { removeCard, dragging }) => (
        <Flex
          mt='10px'
          dragging={dragging}
          flexDirection='column'
          p='25px'
          borderRadius='15px'
          w='270px'
        >
          <Text fontSize='md'>{title}</Text>
          <Text fontSize='md'>{shortDescription}</Text>
        </Flex>
      )}
    />
  );
};

export default Home;
