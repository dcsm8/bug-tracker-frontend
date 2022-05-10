import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { findAll } from '../../../services/tasks-service';

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

  return <Board initialBoard={data} />;
};

export default Home;
