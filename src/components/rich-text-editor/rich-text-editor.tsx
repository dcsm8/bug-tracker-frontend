import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './rich-text-editor.css';

export const RichTextEditor = ({ ...props }) => {
  return (
    <Editor
      wrapperClassName='demo-wrapper'
      editorClassName='demo-editor'
      toolbarClassName='rich-text__toolbar'
      {...props}
    />
  );
};
