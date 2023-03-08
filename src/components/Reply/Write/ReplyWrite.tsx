import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// toast editor
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
// toast plugin (code highlight)
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
// toast plugin color pick
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
// firebase
import { collection, doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../common/Recoil/userInfoState";
import { uuidv4 } from "@firebase/util";
import { Btn } from "../../Login/Login.styles";

export default function ReplyWrite(props: any): JSX.Element {
  const contentRef = useRef(null);
  const router = useRouter();
  const [content, setContent] = useState("");

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const name = userInfo?.email.split("@")[0];
  const commentId = uuidv4();

  useEffect(() => {
    console.log(props.boardData?.id, "comment-boardId");
  });

  const onChangeContent = () => {
    setContent(contentRef.current?.getInstance().getHTML());
  };

  const submitComment = async () => {
    if (content != "") {
      await setDoc(doc(firebaseDb, "comment", commentId), {
        id: props.boardData.id,
        commentId: commentId,
        email: userInfo.email,
        name: name,
        content: content,
        timestamp: new Date(),
      });
      router.reload();
    } else {
      alert("Please enter a title or content");
    }
  };

  return (
    <>
      <Editor
        ref={contentRef}
        onChange={onChangeContent}
        initialValue="typing comment here!"
        previewStyle="tab"
        height="200px"
        initialEditType="markdown"
        useCommandShortcut={false}
        hideModeSwitch={true}
        autofocus={false}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }], colorSyntax]}
      />
      {/* <button onClick={submitComment}>댓글등록</button> */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Btn
          onClick={submitComment}
          style={{ width: "100%", maxWidth: "130px" }}
        >
          submit
        </Btn>
      </div>
    </>
  );
}
