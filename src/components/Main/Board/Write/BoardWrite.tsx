import * as Write from "./BoardWrite.styles";
import { useEffect, useRef, useState } from "react";
import { CommentInput } from "../../../VisitLog/VisitLog.styles";
import { Btn } from "../../../Login/Login.styles";
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
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseDb } from "../../../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../common/Recoil/userInfoState";
import { loginState } from "../../../../common/Recoil/loginState";
import { useRouter } from "next/router";
// uuid
import { uuidv4 } from "@firebase/util";
// icon
import { MdCancel } from "react-icons/md";

export default function BoardWrite(): JSX.Element {
  const contentRef = useRef(null);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // your typing tag
  const [tag, setTag] = useState("");
  // tag list
  const [tags, setTags] = useState([]);

  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const name = userInfo?.email.split("@")[0];
  // url hash
  let hash;
  let boardId;
  let updateBoardId;

  // fetch board detail data func (update)
  async function fetchBoardDetail(condition) {
    const querySnapshot = await getDocs(condition);
    querySnapshot.forEach((doc) => {
      // fetch title data init staticMethods(title)
      setTitle(doc.data().title);
      // fetch content data init editor
      contentRef.current?.getInstance().setHTML(doc.data().content);
    });
  }

  useEffect(() => {
    // create, update condition
    if (window.location.hash.split("=")[0].toString() != undefined) {
      // update
      // get url hash
      // ex) #blog => blog
      hash = window.location.hash.split("=")[0].split("#")[1].toString();
      updateBoardId = window.location.hash.split("=")[1]?.toString();
    } else {
      // create
      hash = window.location.hash.split("#")[1].toString();
    }
    boardId = uuidv4();
    console.log("hash(boardType)", hash);
    console.log("updateBoardId", updateBoardId);

    if (userInfo?.email == "" || loginStatus == false) {
      router.push("/login");
    }

    // fetch func (update)
    if (hash != undefined && updateBoardId != undefined) {
      console.log("test", hash, updateBoardId);
      const condition = query(
        collection(firebaseDb, hash),
        where("id", "==", updateBoardId)
      );
      fetchBoardDetail(condition);
    }
  }, []);

  // if you press enter, start tag func
  const addTag = (e) => {
    console.log("enter");
    // enter code
    if (e.keyCode == 13) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const onChangeContent = () => {
    setContent(contentRef.current?.getInstance().getHTML());
  };

  const submitContent = async () => {
    hash = window.location.hash.split("=")[0].split("#")[1].toString();
    updateBoardId = window.location.hash.split("=")[1]?.toString();

    // create, update condition
    if (updateBoardId == undefined) {
      // create
      // init function..
      if (content != "" && title != "") {
        await setDoc(doc(firebaseDb, hash, boardId), {
          // not duplicate board id
          id: boardId,
          email: userInfo.email,
          name: name,
          title: title,
          tag: tags,
          content: content,
          timestamp: new Date(),
        });
        router.push(`/board/${hash}=${boardId}`);
      } else {
        alert("Please enter a title or content");
      }
    } else {
      // update
      if (content != "" && title != "") {
        console.log("아니 왜 안되는거", hash, updateBoardId);

        const updateBoard = doc(
          firebaseDb,
          hash.toString(),
          updateBoardId.toString()
        );

        await updateDoc(updateBoard, {
          title: title,
          content: content,
        });
        router.push(`/board/${hash}=${updateBoardId}`);
      }
    }
  };

  return (
    <Write.Wrapper>
      {/* title input (no comment input) */}
      <CommentInput
        style={{ width: "100%", marginBottom: "20px" }}
        placeholder="title"
        onChange={(e) => {
          setTitle(e.target.value);
          console.log(title);
        }}
        defaultValue={title}
      />
      {/* content */}
      <Editor
        ref={contentRef}
        onChange={onChangeContent}
        initialValue={"typing content here!"}
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown"
        useCommandShortcut={false}
        hideModeSwitch={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }], colorSyntax]}
      />
      {/* tag input (no comment input) */}
      <Write.BottomWrapper>
        <CommentInput
          style={{ width: "50%", marginTop: "20px" }}
          placeholder="tag (typing and press enter)"
          onChange={(e) => {
            setTag(e.target.value);
          }}
          onKeyDown={addTag}
          value={tag}
        />
        <Write.tagWrapper>
          {/* show tags */}
          {tags.map((el, index) => (
            <>
              <Write.tag key={index}>
                #{el}
                <MdCancel
                  style={{
                    marginLeft: "3px",
                    cursor: "pointer",
                  }}
                  // delete tag
                  onClick={() => {
                    const newTags = tags;
                    newTags.splice(index, 1);
                    console.log(newTags);
                    setTags([...newTags]);
                  }}
                />
              </Write.tag>
            </>
          ))}
        </Write.tagWrapper>
      </Write.BottomWrapper>
      <Write.BtnWrapper>
        <Btn
          onClick={submitContent}
          style={{ width: "10%", marginRight: "10px" }}
        >
          submit
        </Btn>
        <Btn
          onClick={() => {
            window.history.back();
          }}
          style={{ width: "10%" }}
        >
          cancel
        </Btn>
      </Write.BtnWrapper>
    </Write.Wrapper>
  );
}
