import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './rich-text-editor.css';

export const RichTextEditor = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(),
  );

  return (
    <Editor
      editorState={editorState}
      wrapperClassName='demo-wrapper'
      editorClassName='demo-editor'
      onEditorStateChange={setEditorState}
    />
  );
};
