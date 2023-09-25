import { useEffect, useState } from "react";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
// firebase
import {
    Query,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { firebaseDb } from "../../../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../common/Recoil/userInfoState";
import { loginState } from "../../../../common/Recoil/loginState";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useEditor } from "@/hooks/commons";
import Input from "@/components/commons/Input/Input";
import Textarea from "@/components/commons/Textarea/Textarea";
import EditorWrite from "@/components/commons/Editor/EditorWrite";
import Button from "@/components/commons/Button/Button";

export default function BoardEdit(): JSX.Element {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [editorContent, onChangeEditorContent, setEditorContent] =
        useEditor("");

    const [loginStatus] = useRecoilState(loginState);
    const [userInfo] = useRecoilState(userInfoState);

    const [boardType, setBoardType] = useState("");
    const [boardId, setBoardId] = useState("");
    const queries: string | undefined = router.query.boardID?.toString();

    // fetch board detail data func
    async function fetchBoardDetail(condition: Query<any>) {
        const querySnapshot = await getDocs(condition);
        querySnapshot.forEach((doc: any) => {
            setTitle(doc.data().title);
            setDesc(doc.data().desc);
            setEditorContent(doc.data().content);
        });
    }

    useEffect(() => {
        if (!router.isReady) return;

        // get board id from url
        if (queries !== undefined) setBoardId(queries.toString());

        // get board type form url
        setBoardType(window.location.hash.split("#")[1].toString());
    }, [queries]);

    useEffect(() => {
        if (userInfo?.email === null || loginStatus == false) {
            router.push("/login");
        }
    }, []);

    useEffect(() => {
        if (boardType !== "" && boardId !== "") {
            const condition = query(
                collection(firebaseDb, boardType),
                where("id", "==", boardId)
            );

            fetchBoardDetail(condition);
        }
    }, [boardType, boardId]);

    const submitContent = async () => {
        if (editorContent != "" && title != "") {
            // update func
            const userDoc = doc(firebaseDb, boardType, boardId);
            const newField = {
                title: title,
                desc: desc,
                content: editorContent,
            };

            await updateDoc(userDoc, newField);
            router.push(`/board/${boardType}=${boardId}`);
        } else {
            alert("Please enter a title or content");
        }
    };

    return (
        <StyledBoardWrite>
            {/* test */}
            <h1>Title</h1>
            <Input
                placeholder={"type title!"}
                setValue={setTitle}
                value={title}
            />
            <h1>Description</h1>
            <Textarea
                placeholder={
                    "Please enter a brief description in 200 characters"
                }
                setValue={setDesc}
                value={desc}
            />
            <h1>Content</h1>
            {/* 삼항연산자를 사용하면 최초 렌더링 시,
            contents가 undefined이기 때문에(내 예상임 그냥),
            빈값인 작성하기 경우의 에디터로 렌더링 되는 문제가 있어 다음과 같이 함. */}
            {editorContent && (
                <EditorWrite
                    type={"markdown"}
                    onChange={onChangeEditorContent}
                    imgUploadUrl={"projectPhoto"}
                    initialValue={editorContent ?? ""}
                />
            )}
            {!editorContent && (
                <EditorWrite
                    type={"markdown"}
                    onChange={onChangeEditorContent}
                    imgUploadUrl={"projectPhoto"}
                    initialValue={editorContent ?? ""}
                />
            )}
            <div>
                <Button
                    label={"submit"}
                    primary={false}
                    backgroundColor={"black"}
                    onClick={submitContent}
                />
                <Button
                    label={"cancel"}
                    primary={false}
                    backgroundColor={"black"}
                    onClick={() => {
                        window.history.back();
                    }}
                />
            </div>
        </StyledBoardWrite>
    );
}

const StyledBoardWrite = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 10px;
    margin-bottom: 60px;
    max-width: 1200px;
    width: 100%;

    > h1 {
        font-family: serif;
        padding-left: 10px;
        font-size: 18px;
    }

    > div {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        > button {
            margin: 0px;
            margin-right: 10px;
        }
    }
`;
