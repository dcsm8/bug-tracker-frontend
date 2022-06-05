import { Avatar, Box, Divider, Flex, HStack, Text } from '@chakra-ui/react';
import { Comment } from '@interfaces/comment.interface';
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
  comments: Comment[];
};

export const ViewComments = ({ comments }: ViewCommentsProps) => {
  const commentList = comments.map((comment) => (
    <ViewComment comment={comment} key={comment.id} />
  ));

  return <Box>{commentList}</Box>;
};
