import { ShowIf } from '@components/show-if/show-if';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './rich-text-editor.css';

type RichTextEditorProps = {
  showToolbar: boolean;
  [props: string]: any;
};

export const RichTextEditor = ({
  showToolbar,
  ...props
}: RichTextEditorProps) => {
  return (
    <React.Fragment>
      <ShowIf condition={!showToolbar}>
        <Editor
          wrapperClassName='hide-toolbar-wrapper'
          editorClassName='hide-toolbar-editor'
          toolbarClassName='hide-toolbar'
          {...props}
        />
      </ShowIf>
      <ShowIf condition={showToolbar}>
        <Editor
          wrapperClassName='show-toolbar-wrapper'
          editorClassName='show-toolbar-editor'
          {...props}
        />
      </ShowIf>
    </React.Fragment>
  );
};
