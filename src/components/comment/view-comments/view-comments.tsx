import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteConfirmDialog } from '@components/delete-confirm-dialog/delete-confirm-dialog';
import { Comment } from '@interfaces/comment.interface';
import { Task } from '@interfaces/task-interface';
import { remove } from '@services/comments-service';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

type ViewCommentProps = {
  comment: Comment;
};

const ViewComment = ({ comment }: ViewCommentProps) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteComment } = useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', comment.task]);
    },
  });

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
          <HStack mr={5} mt={1}>
            <Button colorScheme='teal' size='xs' variant='link'>
              Edit
            </Button>
            <Text fontSize='x-small' textColor='gray.400'>
              &#x2022;
            </Text>
            <Button
              colorScheme='teal'
              size='xs'
              variant='link'
              onClick={onOpenDelete}
            >
              Delete
            </Button>
            <DeleteConfirmDialog
              isOpen={isOpenDelete}
              onClose={onCloseDelete}
              onDelete={() => deleteComment(comment)}
              title='Delete Comment'
            />
          </HStack>
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
