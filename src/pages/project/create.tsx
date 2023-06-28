import Input from "@/components/Input/Input";
import Tag from "@/components/commons/Tag/Tag";
import { useDidMountEffect, useEditor } from "@/hooks/commons";
import styled from "@emotion/styled";
import { firebaseDb } from "firebase.config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { uuidv4 } from "@firebase/util";
import { useRecoilState } from "recoil";
import { loginState } from "@/common/Recoil/loginState";
import { userInfoState } from "@/common/Recoil/userInfoState";
import { useRouter } from "next/router";
import Button from "@/components/commons/Button/Button";
import Textarea from "@/components/commons/Textarea/Textarea";
import BoardImgUpload from "@/components/commons/Board/BoardImgUpload";

const EditorWrite = dynamic(
    async () => await import("@/components/commons/Editor/EditorWrite"),
    { ssr: false }
);

export default function ProjectCreate() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [editorContent, onChangeEditorContent] = useEditor("");
    const [tags, setTags] = useState<string[]>([]);
    const [imgUrl, setImgUrl] = useState<string | null>(null);

    const [loginStatus] = useRecoilState(loginState);
    const [userInfo] = useRecoilState(userInfoState);
    // create board id
    const boardId = uuidv4();
    // fetch board id
    const { fetchBoardId } = router.query;
    // update mode
    const [updateFlag, setUpdateFlag] = useState<boolean>(false);
    const [fetchContent, setFetchContent] = useState<string | null>(null);

    // check login & user
    useDidMountEffect(() => {
        if (userInfo === null || loginStatus === false) {
            router.push("/login");
            return;
        }

        if (
            userInfo?.email !== "aimzero9303@gmail.com" &&
            loginStatus === true
        ) {
            router.push("/project");
            return;
        }
    }, [loginStatus, userInfo]);

    // check update mode
    useEffect(() => {
        if (router.isReady && fetchBoardId) {
            setUpdateFlag(true);
            fetchBoardDetail(fetchBoardId.toString());
        } else {
            setUpdateFlag(false);
        }
    }, [router]);

    // submit
    const createBoard = async () => {
        // create OR update
        if (!updateFlag) {
            try {
                if (editorContent != "" && title != "") {
                    await setDoc(doc(firebaseDb, "project", boardId), {
                        id: boardId,
                        email: userInfo.email,
                        name: userInfo?.email.split("@")[0],
                        thumb: imgUrl,
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
        } else {
            try {
                if (editorContent != "" && title != "") {
                    const userDoc = doc(
                        firebaseDb,
                        "project",
                        fetchBoardId?.toString() ?? ""
                    );
                    const updateField = {
                        id: fetchBoardId,
                        email: userInfo.email,
                        name: userInfo?.email.split("@")[0],
                        thumb: imgUrl,
                        title: title,
                        desc: desc,
                        content: editorContent,
                        tag: tags,
                        timestamp: new Date(),
                    };
                    await updateDoc(userDoc, updateField);
                    router.push(`/project/${fetchBoardId}`);
                } else {
                    alert("Please enter a title or content");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    // fetch board data function
    const fetchBoardDetail = async (id: string) => {
        if (id.toString()) {
            const docRef = doc(firebaseDb, "project", id.toString());
            try {
                const docSnap = (await getDoc(docRef)).data();
                console.log("docSnap", docSnap);
                console.log(docSnap?.desc);
                setTitle(docSnap?.title);
                setImgUrl(docSnap?.thumb);
                setDesc(docSnap?.desc);
                setTags(docSnap?.tag);
                setFetchContent(docSnap?.content);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <StyledCreate>
            <h1>title</h1>
            <Input
                placeholder={"type title!"}
                setValue={setTitle}
                value={title}
            />
            <h1>description</h1>
            <Textarea
                placeholder={
                    "Please enter a brief description in 200 characters"
                }
                setValue={setDesc}
                value={desc}
            />
            <h1>content</h1>
            {/* 삼항연산자를 사용하면 최초 렌더링 시, 
            contents가 undefined이기 때문에(내 예상임 그냥), 
            빈값인 작성하기 경우의 에디터로 렌더링 되는 문제가 있어 다음과 같이 함. */}
            {fetchContent && (
                <EditorWrite
                    type={"markdown"}
                    onChange={onChangeEditorContent}
                    imgUploadUrl={"projectPhoto"}
                    initialValue={fetchContent ?? ""}
                />
            )}
            {!fetchContent && (
                <EditorWrite
                    type={"markdown"}
                    onChange={onChangeEditorContent}
                    imgUploadUrl={"projectPhoto"}
                    initialValue={fetchContent ?? ""}
                />
            )}

            <h1>thumbnail</h1>
            <BoardImgUpload setImgUrl={setImgUrl} imgUrl={imgUrl} />
            <h1>tag</h1>
            <Tag tags={tags} setTags={setTags} />
            <div>
                <Button
                    label={"submit"}
                    primary={false}
                    backgroundColor={"black"}
                    onClick={createBoard}
                />
            </div>
        </StyledCreate>
    );
}

const StyledCreate = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 30px;
    margin-bottom: 20px;
    max-width: 1200px;
    width: 100%;

    > h1 {
        font-family: serif;
    }

    > div {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
`;
