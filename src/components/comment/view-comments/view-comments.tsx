import { Avatar, Box, Divider, Flex, HStack, Text } from '@chakra-ui/react';
import { Comment } from '@interfaces/comment.interface';
import { Task } from '@interfaces/task-interface';
import React from 'react';

type ViewCommentProps = {
  comment: Comment;
};

const ViewComment = ({ comment }: ViewCommentProps) => {
  return (
    <React.Fragment>
      <Flex mt={4}>
        <Box mr={5} mt={3}>
          <Avatar size={'sm'} name={'test'} />
        </Box>
        <Box>
          <HStack mr={5} mt={3}>
            <Text fontWeight='bold'>{comment.user.fullName}</Text>
            <Text fontSize='x-small' textColor='gray.400'>
              &#x2022;
            </Text>
            <Text fontWeight='semibold' textColor='gray.600'>
              {comment.createdAt}
            </Text>
          </HStack>
          <div dangerouslySetInnerHTML={{ __html: comment.text }} />
        </Box>
      </Flex>
      <Divider mt={3} />
    </React.Fragment>
  );
};

type ViewCommentsProps = {
  task?: Task;
};

export const ViewComments = ({ task }: ViewCommentsProps) => {
  if (!task) {
    return null;
  }

  const commentList = task.comments.map((comment) => (
    <ViewComment comment={comment} key={comment.id} />
  ));

  return <Box>{commentList}</Box>;
};
