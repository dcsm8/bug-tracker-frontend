import React, { Dispatch } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './rich-text-editor.css';

type RichTextEditorProps = {
  editorState: any;
  setEditorState: Dispatch<any>;
};

export const RichTextEditor = ({
  editorState,
  setEditorState,
}: RichTextEditorProps) => {
  return (
    <Editor
      editorState={editorState}
      wrapperClassName='demo-wrapper'
      editorClassName='demo-editor'
      onEditorStateChange={setEditorState}
    />
  );
};
