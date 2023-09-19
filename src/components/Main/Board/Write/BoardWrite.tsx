import { useEffect, useState } from "react";
// firebase
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../../../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../common/Recoil/userInfoState";
import { loginState } from "../../../../common/Recoil/loginState";
import { useRouter } from "next/router";
// uuid
import { uuidv4 } from "@firebase/util";

import Tag from "@/components/commons/Tag/Tag";
import Input from "@/components/commons/Input/Input";
import EditorWrite from "@/components/commons/Editor/EditorWrite";
import Button from "@/components/commons/Button/Button";
import { useEditor } from "@/hooks/commons";
import styled from "@emotion/styled";
import Textarea from "@/components/commons/Textarea/Textarea";

export default function BoardWrite(): JSX.Element {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [editorContent, onChangeEditorContent] = useEditor("");

    const [loginStatus] = useRecoilState(loginState);
    const [userInfo] = useRecoilState(userInfoState);
    const name = userInfo?.email.split("@")[0];

    // url hash
    let hash: string;
    let boardId: string;

    useEffect(() => {
        // get url hash
        // ex) #blog => blog
        hash = window.location.hash.split("#")[1].toString();
        boardId = uuidv4();
        if (userInfo?.email === null || loginStatus == false) {
            router.push("/login");
        }
    });

    const submitContent = async () => {
        if (editorContent != "" && title != "") {
            await setDoc(doc(firebaseDb, hash, boardId), {
                // not duplicate board id
                id: boardId,
                email: userInfo.email,
                name: name,
                title: title,
                desc: desc,
                content: editorContent,
                timestamp: new Date(),
            });
            router.push(`/board/${hash}=${boardId}`);
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
            <EditorWrite
                type={"markdown"}
                onChange={onChangeEditorContent}
                imgUploadUrl={"projectPhoto"}
                initialValue={""}
            />
            <div>
                <Button
                    label={"submit"}
                    primary={false}
                    backgroundColor={"black"}
                    onClick={submitContent}
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
        }
    }
`;
