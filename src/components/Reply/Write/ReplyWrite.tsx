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
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firebaseDb, firebaseStorage } from "../../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../common/Recoil/userInfoState";
import { uuidv4 } from "@firebase/util";
import { Btn } from "../../Login/Login.styles";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ReplyWrite(props: any): JSX.Element {
  const contentRef = useRef(null);
  const router = useRouter();
  const [content, setContent] = useState("");

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const name = userInfo?.email.split("@")[0];
  const commentId = uuidv4();

  // img upload hook
  useEffect(() => {
    const editorIns = contentRef.current.getInstance();
    editorIns.removeHook("addImageBlobHook"); //<- 제거
    editorIns.addHook("addImageBlobHook", addImage); //<- 추가 },
  }, []);
  // img upload func
  const addImage = async (file, showImage) => {
    console.log(file); //이미지 압축 및 서버 업로드 로직 실행
    let imgUrl;
    const imageRef = ref(firebaseStorage, `replyPhoto/${file.name}`); // storage directory (path, file name)
    if (!file) return;
    await uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        imgUrl = url;
        showImage(imgUrl, "alt_text"); //에디터에 이미지 추가
      });
    });
  };

  useEffect(() => {
    console.log(props.boardData?.id, "comment-boardId");
  });

  // input on change content value
  const onChangeContent = () => {
    setContent(contentRef.current?.getInstance().getHTML());
  };

  // create comment func
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
