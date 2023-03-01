import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
// toast plugin (code highlight)
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

export default function BoardViewer(props: any) {
  console.log(props.boardData);

  return (
    <Viewer
      initialValue={props.boardData.content}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    />
    // <div>{props.boardData.content}</div>
  );
}
