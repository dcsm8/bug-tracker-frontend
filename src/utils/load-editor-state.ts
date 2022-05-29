import { EditorState, ContentState, convertFromHTML } from 'draft-js';

export const loadEditorState = (content: string = '') =>
  EditorState.createWithContent(
    ContentState.createFromBlockArray(convertFromHTML(content)),
  );
