import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { Alert, AlertIcon, Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { findAll } from '@services/tasks-service';
import { useQuery } from 'react-query';

const Home = () => {
  const { isLoading, data, isError } = useQuery(['tasks'], findAll);

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
