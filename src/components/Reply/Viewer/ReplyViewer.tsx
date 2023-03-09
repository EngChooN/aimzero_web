import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// toast ui
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
// toast plugin (code highlight)
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
// recoil
import { useRecoilState } from "recoil";
import { loginState } from "../../../common/Recoil/loginState";
import { userInfoState } from "../../../common/Recoil/userInfoState";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseApp, firebaseDb } from "../../../../firebase.config";
import { Btn } from "../../Login/Login.styles";
import ReplyEdit from "../Edit/ReplyEdit";
// firebase

// styles
const Wrapper = styled.article`
  display: flex;
  flex-direction: column;

  /* margin-top: 50px; */

  height: 100%;
  /* @media (max-width: 1100px) {
    min-height: calc(100vh - 64.5px - 170px);
    padding-top: 15px;
  } */

  @media (max-width: 400px) {
    padding: 10px;
    padding-top: 15px;
  }
`;

const CommentWrapper = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  border-top: 1px solid lightgray;
`;

const ViewWrapper = styled.div``;

const Name = styled.div`
  font-family: serif;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const Date = styled.div`
  font-family: serif;
  font-size: 13px;
  color: darkgray;
  margin-top: 30px;
`;

const NoCommentBox = styled.div`
  padding-top: 70px;
  padding-bottom: 70px;
  border-top: 1px solid lightgray;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: AbrilFatface;
  font-size: 20px;
  color: darkgray;
`;

export default function ReplyViewer(props: any) {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [comments, setCommentsData] = useState([]);

  // update
  const [content, setContent] = useState("");

  // update flag
  const [updateState, setUpdateState] = useState({
    state: false,
    index: "",
  });

  // comment list load func
  const fetchComments = async () => {
    const comments = collection(firebaseDb, "comment");
    const result = await getDocs(
      query(
        comments,
        where("id", "==", props.boardData.id),
        orderBy("timestamp", "desc")
      )
    );
    const fetchData = result.docs.map((el) => el.data());
    setCommentsData(fetchData);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // comment update func
  const updateComment = async (e) => {
    if (content != "") {
      // update func
      const userDoc = doc(firebaseDb, "comment", e.target.id);
      const newField = { content: content };

      await updateDoc(userDoc, newField);
      await fetchComments();
      setUpdateState({ state: false, index: "" });
    } else {
      alert("Please enter a title or content");
    }
  };

  // comment delete func
  const deleteComment = (e) => {
    console.log(e.target.id);
    deleteDoc(doc(firebaseDb, "comment", e.target.id));
    fetchComments();
  };

  return (
    <Wrapper>
      {props.boardData.content &&
        comments.map((el, index) => (
          <CommentWrapper key={index}>
            <Name>{el.name}</Name>
            {updateState.state == false ? (
              <ViewWrapper>
                <Viewer
                  initialValue={el.content}
                  plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                />
              </ViewWrapper>
            ) : null}
            {updateState.state == true &&
            updateState.index == index.toString() ? (
              <ViewWrapper>
                <ReplyEdit
                  boardId={props.boardData.id}
                  setContent={setContent}
                  commentId={el.commentId}
                />
              </ViewWrapper>
            ) : null}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Date>{el.timestamp.toDate().toISOString().split("T")[0]}</Date>
              {userInfo.email == el.email ? (
                <div style={{ display: "flex" }}>
                  {updateState.state == false && (
                    <>
                      <Btn
                        style={{
                          width: "100%",
                          maxWidth: "100px",
                          height: "25px",
                          fontSize: "12px",
                        }}
                        onClick={(e) => {
                          setUpdateState({
                            state: true,
                            index: index.toString(),
                          });
                        }}
                      >
                        update
                      </Btn>
                      <Btn
                        style={{
                          width: "100%",
                          maxWidth: "100px",
                          marginLeft: "10px",
                          height: "25px",
                          fontSize: "12px",
                        }}
                        id={el.commentId}
                        onClick={(e) => deleteComment(e)}
                      >
                        delete
                      </Btn>
                    </>
                  )}
                  {updateState.state == true &&
                  updateState.index == index.toString() ? (
                    <>
                      <Btn
                        style={{
                          width: "100%",
                          maxWidth: "100px",
                          height: "25px",
                          fontSize: "12px",
                        }}
                        id={el.commentId}
                        onClick={(e) => updateComment(e)}
                      >
                        submit
                      </Btn>
                      <Btn
                        style={{
                          width: "100%",
                          maxWidth: "100px",
                          marginLeft: "10px",
                          height: "25px",
                          fontSize: "12px",
                        }}
                        onClick={() => {
                          setUpdateState({ state: false, index: "" });
                        }}
                      >
                        cancel
                      </Btn>
                    </>
                  ) : null}
                </div>
              ) : null}
            </div>
          </CommentWrapper>
        ))}
      {comments[0]?.content == undefined && (
        <NoCommentBox>There are no comments</NoCommentBox>
      )}
    </Wrapper>
  );
}
