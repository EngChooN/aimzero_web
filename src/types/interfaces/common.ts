import { SetStateAction } from "react";

// editor-write
export interface EditorOptions {
  height?: string;
  type: "html" | "markdown";
  initialValue?: string;
  onChange: (type: string, ref: any) => void;
  imgUploadUrl: string;
}

// tag
export interface TagOptions {
  tags: string[];
  setTags: React.Dispatch<SetStateAction<string[]>>;
}
