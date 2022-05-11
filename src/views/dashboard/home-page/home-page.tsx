import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import { findAll } from '@services/tasks-service';
import { useQuery } from 'react-query';

const Home = () => {
  const { isLoading, data, isError } = useQuery('findAllTasks', findAll);

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
      onCardDragEnd={(board, card, source, destination) => {
        console.log(card);
        console.log(board);
        console.log(destination);
        console.log(source);
      }}
    />
  );
};

export default Home;
