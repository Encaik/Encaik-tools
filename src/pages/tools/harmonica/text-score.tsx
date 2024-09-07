import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

loader.config({ monaco });

export default function TextScore(props: {
  textScore: string;
  setTextScore: (textScore: string) => void;
}) {
  return <Editor defaultValue={props.textScore} />;
}
