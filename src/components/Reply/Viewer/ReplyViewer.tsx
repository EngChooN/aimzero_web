import styled from "@emotion/styled";
import { SetStateAction, useState } from "react";
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
// firebase
import { DocumentData, deleteDoc, doc, updateDoc } from "firebase/firestore";
import ReplyEdit from "@/components/Reply/Edit/ReplyEdit";
import Button from "@/components/commons/Button/Button";
import { userInfoState } from "@/common/Recoil/userInfoState";
import { firebaseDb } from "firebase.config";

export default function ReplyViewer(props: {
    boardData: DocumentData;
    comments: DocumentData;
    setCommentsData: React.Dispatch<SetStateAction<DocumentData[]>>;
    fetchComments: () => void;
}) {
    const { boardData, comments, setCommentsData, fetchComments } = props;

    const [userInfo] = useRecoilState(userInfoState);

    // update
    const [content, setContent] = useState("");

    // update flag
    const [updateState, setUpdateState] = useState({
        state: false,
        index: "",
    });

    // comment update func
    const updateComment = async (commentId: string) => {
        if (content !== "") {
            // update func
            const userDoc = doc(firebaseDb, "comment", commentId);
            const newField = { content: content };

            await updateDoc(userDoc, newField);
            await fetchComments();
            setUpdateState({ state: false, index: "" });
        } else {
            alert("Please enter a title or content");
        }
    };

    const deleteComment = async (commentId: string) => {
        try {
            const commentDocRef = doc(firebaseDb, "comment", commentId);
            await deleteDoc(commentDocRef);
            setCommentsData([]);
            fetchComments(); // 삭제 후 댓글 다시 불러오기
        } catch (error) {
            console.error("문서 삭제 오류:", error);
        }
    };

    return (
        <Wrapper>
            {boardData.content &&
                comments.map((el: DocumentData, index: number) => (
                    <CommentWrapper key={index}>
                        <Name>{el.name}</Name>
                        {updateState.state === false ? (
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
                        {updateState.state === true &&
                        updateState.index === index.toString() ? (
                            <ViewWrapper>
                                <ReplyEdit
                                    setContent={setContent}
                                    commentId={el.commentId}
                                />
                            </ViewWrapper>
                        ) : null}
                        {updateState.state === true &&
                        updateState.index !== index.toString() ? (
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
                            {userInfo.email === el.email ? (
                                <div style={{ display: "flex" }}>
                                    {updateState.state === false && (
                                        <>
                                            <Button
                                                label="update"
                                                primary={false}
                                                backgroundColor="black"
                                                onClick={(e) => {
                                                    setUpdateState({
                                                        state: true,
                                                        index: index.toString(),
                                                    });
                                                }}
                                            />
                                            <Button
                                                label="delete"
                                                primary={false}
                                                backgroundColor="black"
                                                onClick={(e) =>
                                                    deleteComment(el.commentId)
                                                }
                                            />
                                        </>
                                    )}
                                    {updateState.state === true &&
                                    updateState.index === index.toString() ? (
                                        <>
                                            <Button
                                                label="submit"
                                                primary={false}
                                                backgroundColor="black"
                                                onClick={(e) =>
                                                    updateComment(el.commentId)
                                                }
                                            />
                                            <Button
                                                label="cancel"
                                                primary={false}
                                                backgroundColor="black"
                                                onClick={() => {
                                                    setUpdateState({
                                                        state: false,
                                                        index: "",
                                                    });
                                                }}
                                            />
                                        </>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>
                    </CommentWrapper>
                ))}
            {comments[0]?.content === undefined && (
                <NoCommentBox>There are no comments</NoCommentBox>
            )}
        </Wrapper>
    );
}

// styles
const Wrapper = styled.article`
    display: flex;
    flex-direction: column;
    height: 100%;

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
