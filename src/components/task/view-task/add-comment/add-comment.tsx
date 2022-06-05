import { Avatar, Box, Button, Flex } from '@chakra-ui/react';
import { RichTextEditor } from '@components/rich-text-editor/rich-text-editor';
import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { ShowIf } from '@components/show-if/show-if';
import { loadEditorState } from '@utils/load-editor-state';
import { useUser } from '@store/use-user';

export const AddComment = () => {
  const { user } = useUser();
  const [commentEditorState, setCommentEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);

  const onCancel = () => {
    setCommentEditorState(loadEditorState(''));
    setFocused(false);
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
          placeholder='Enter comment'
          onFocus={onFocus}
        />
        <ShowIf condition={focused}>
          <Box mt={2}>
            <Button colorScheme='blue' mr={3}>
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
