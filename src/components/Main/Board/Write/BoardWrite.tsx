import * as Write from "./BoardWrite.styles";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import { EditorProps } from "@toast-ui/react-editor";
import { CommentInput } from "../../../VisitLog/VisitLog.styles";
import { useState } from "react";

const Editor = dynamic<EditorProps>(
  () => import("@toast-ui/react-editor").then((m) => m.Editor),
  { ssr: false }
);

export default function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <Write.Wrapper>
      <CommentInput
        style={{ width: "100%", marginBottom: "20px" }}
        placeholder="title"
        onChange={(e) => {
          setTitle(e.target.value);
          console.log(title);
        }}
      />
      <Editor
        initialValue="type here!"
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
    </Write.Wrapper>
  );
}
