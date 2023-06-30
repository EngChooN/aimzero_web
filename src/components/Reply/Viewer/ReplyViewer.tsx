import styled from "@emotion/styled";
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
import { userInfoState } from "../../../common/Recoil/userInfoState";
// firebase
import {
    DocumentData,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { firebaseDb } from "../../../../firebase.config";
import { Btn } from "../../Login/Login.styles";
import ReplyEdit from "../Edit/ReplyEdit";
import { darkModeState } from "@/common/Recoil/darkModeState";

export default function ReplyViewer(props: { boardData: DocumentData }) {
    const { boardData } = props;
    const [darkMode] = useRecoilState(darkModeState);

    const [userInfo] = useRecoilState(userInfoState);
    const [comments, setCommentsData] = useState<DocumentData[]>([]);

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
                where("id", "==", boardData.id),
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
    const updateComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (content !== "") {
            // update func
            const userDoc = doc(firebaseDb, "comment", e.currentTarget.id);
            const newField = { content: content };

            await updateDoc(userDoc, newField);
            await fetchComments();
            setUpdateState({ state: false, index: "" });
        } else {
            alert("Please enter a title or content");
        }
    };

    // comment delete func
    const deleteComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.id);
        deleteDoc(doc(firebaseDb, "comment", e.currentTarget.id));
        fetchComments();
    };

    return (
        <Wrapper>
            {boardData.content &&
                comments.map((el, index) => (
                    <CommentWrapper key={index} isDark={darkMode}>
                        <Name>{el.name}</Name>
                        {updateState.state == false ? (
                            <ViewWrapper>
                                <Viewer
                                    initialValue={el.content}
                                    plugins={[
                                        [
                                            codeSyntaxHighlight,
                                            { highlighter: Prism },
                                        ],
                                    ]}
                                />
                            </ViewWrapper>
                        ) : null}
                        {updateState.state == true &&
                        updateState.index == index.toString() ? (
                            <ViewWrapper>
                                <ReplyEdit
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
                            <Date>
                                {
                                    el.timestamp
                                        .toDate()
                                        .toISOString()
                                        .split("T")[0]
                                }
                            </Date>
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
                                                onClick={(e) =>
                                                    deleteComment(e)
                                                }
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
                                                onClick={(e) =>
                                                    updateComment(e)
                                                }
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
                                                    setUpdateState({
                                                        state: false,
                                                        index: "",
                                                    });
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

const CommentWrapper = styled.div<{ isDark: boolean }>`
    padding-top: 30px;
    padding-bottom: 30px;
    border-top: ${(props) =>
        !props.isDark ? "1px solid lightgray" : "1px solid grey"};
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
