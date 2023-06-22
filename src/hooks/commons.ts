import { Editor } from "@toast-ui/react-editor";
import { RefObject, useState } from "react";

export const useEditor = (initialValue: string) => {
  const [editorContent, setEditorContent] = useState(initialValue);

  const onChangeEditorContent = (
    type: string,
    contentRef: RefObject<Editor>
  ) => {
    if (type === "html") {
      setEditorContent(contentRef.current?.getInstance().getHTML() ?? "");
    }

    if (type === "markdown") {
      setEditorContent(contentRef.current?.getInstance().getMarkdown() ?? "");
    }
  };

  return [editorContent, onChangeEditorContent] as const;
};
