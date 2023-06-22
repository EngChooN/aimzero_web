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

const EditorWrite = dynamic(
  async () => await import("@/components/commons/EditorWrite/EditorWrite"),
  { ssr: false }
);

export default function ProjectCreate() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [editorContent, onChangeEditorContent] = useEditor("");
  const [tags, setTags] = useState<string[]>([]);

  // const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  // const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const boardId = uuidv4();

  // useEffect(() => {
  //   if (userInfo?.email == "" || loginStatus == false) {
  //     router.push("/login");
  //   }
  // });

  const createBoard = async () => {
    if (editorContent != "" && title != "") {
      await setDoc(doc(firebaseDb, "project", boardId), {
        id: boardId,
        email: "aimzero9303@gmail.com",
        name: "aimzero9303",
        title: title,
        tag: tags,
        content: editorContent,
        timestamp: new Date(),
      });
      router.push(`/project/${boardId}`);
    } else {
      alert("Please enter a title or content");
    }
  };

  return (
    <StyledCreate>
      <Input placeholder={"type title!"} setValue={setTitle} value={title} />
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
`;
