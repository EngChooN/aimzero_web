import Input from "@/components/Input/Input";
import Tag from "@/components/commons/Tag/Tag";
import { useEditor } from "@/hooks/commons";
import styled from "@emotion/styled";
import { firebaseDb } from "firebase.config";
import { doc, setDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { uuidv4 } from "@firebase/util";
import { useRecoilState } from "recoil";
import { loginState } from "@/common/Recoil/loginState";
import { userInfoState } from "@/common/Recoil/userInfoState";
import { useRouter } from "next/router";
import Button from "@/components/commons/Button/Button";
import Textarea from "@/components/commons/Textarea/Textarea";

const EditorWrite = dynamic(
    async () => await import("@/components/commons/EditorWrite/EditorWrite"),
    { ssr: false }
);

export default function ProjectCreate() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [editorContent, onChangeEditorContent] = useEditor("");
    const [tags, setTags] = useState<string[]>([]);

    const [loginStatus] = useRecoilState(loginState);
    const [userInfo] = useRecoilState(userInfoState);
    const boardId = uuidv4();

    console.log("create.tsx", loginStatus, userInfo, boardId);

    // useEffect(() => {
    //     if (userInfo?.email == "" || loginStatus == false) {
    //         router.push("/login");
    //     }
    // });

    // create
    const createBoard = async () => {
        try {
            if (editorContent != "" && title != "") {
                await setDoc(doc(firebaseDb, "project", boardId), {
                    id: boardId,
                    email: userInfo.email,
                    name: userInfo?.email.split("@")[0],
                    title: title,
                    desc: desc,
                    content: editorContent,
                    tag: tags,
                    timestamp: new Date(),
                });
                router.push(`/project/${boardId}`);
            } else {
                alert("Please enter a title or content");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <StyledCreate>
            <Input
                placeholder={"type title!"}
                setValue={setTitle}
                value={title}
            />
            <Textarea
                placeholder={
                    "Please enter a brief description in 200 characters"
                }
                setValue={setDesc}
            />
            <EditorWrite
                type={"markdown"}
                onChange={onChangeEditorContent}
                imgUploadUrl={"projectPhoto"}
            />
            <Tag tags={tags} setTags={setTags} />
            <Button
                label={"submit"}
                primary={false}
                backgroundColor={"black"}
                onClick={createBoard}
            />
        </StyledCreate>
    );
}

const StyledCreate = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 30px;
    margin-bottom: 20px;
    max-width: 1200px;
    width: 100%;
`;
