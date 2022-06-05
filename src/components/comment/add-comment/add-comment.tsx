import { Avatar, Box, Button, Flex } from '@chakra-ui/react';
import { RichTextEditor } from '@components/rich-text-editor/rich-text-editor';
import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { ShowIf } from '@components/show-if/show-if';
import { loadEditorState } from '@utils/load-editor-state';
import { useUser } from '@store/use-user';
import { useMutation, useQueryClient } from 'react-query';
import { create } from '@services/comments-service';
import { CreateCommentDto } from '@interfaces/comment.interface';
import { useTaskStore } from '@store/task-store';
import draftToHtml from 'draftjs-to-html';

export const AddComment = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const selectedTask = useTaskStore((state) => state.selectedTask);
  const [commentEditorState, setCommentEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);

  const onCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setCommentEditorState(loadEditorState(''));
    setFocused(false);
  };

  const { mutateAsync: createComment, isLoading } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      resetForm();
    },
  });

  const onClick = async () => {
    if (selectedTask) {
      const rawContentState = convertToRaw(
        commentEditorState.getCurrentContent(),
      );
      const markup = draftToHtml(rawContentState);

      const createCommentDto: CreateCommentDto = {
        task: selectedTask.id,
        text: markup,
        user: user.keyId,
      };

      await createComment(createCommentDto);
    }
  };

  return (
    <Flex>
      <Box mr={5} mt={3}>
        <Avatar size={'sm'} name={user?.fullName} />
      </Box>
      <Box w='full'>
        <RichTextEditor
          showToolbar={focused}
          editorState={commentEditorState}
          onEditorStateChange={setCommentEditorState}
          placeholder='Add comment'
          onFocus={onFocus}
          wrapperStyle={{
            border: '1px solid #E2E8F0',
            padding: focused ? '0px' : '0 10px',
          }}
        />
        <ShowIf condition={focused}>
          <Box mt={2}>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={onClick}
              isLoading={isLoading}
            >
              Save
            </Button>
            <Button variant='ghost' onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        </ShowIf>
      </Box>
    </Flex>
  );
};
