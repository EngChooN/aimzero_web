import * as Edit from "./BoardEdit.styles";
import { RefObject, useEffect, useRef, useState } from "react";
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
    Query,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { firebaseDb, firebaseStorage } from "../../../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../common/Recoil/userInfoState";
import { loginState } from "../../../../common/Recoil/loginState";
import { useRouter } from "next/router";
// icon
import { MdCancel } from "react-icons/md";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { HookCallback } from "@toast-ui/editor/types/editor";

export default function BoardEdit(): JSX.Element {
    const contentRef = useRef<Editor>(null);
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // your typing tag
    const [tag, setTag] = useState("");
    // tag list
    const [tags, setTags] = useState<string[]>([]);

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
            setTags(doc.data().tag);
            console.log(doc.data().tag);
            contentRef.current?.getInstance().setHTML(doc.data().content);
        });
    }

    // img upload hook
    useEffect(() => {
        const editorIns = contentRef.current?.getInstance();
        editorIns?.removeHook("addImageBlobHook"); //<- 제거
        editorIns?.addHook("addImageBlobHook", addImage); //<- 추가 },
    }, []);
    // img upload func
    const addImage = async (file: File, showImage: HookCallback) => {
        console.log(file); //이미지 압축 및 서버 업로드 로직 실행
        let imgUrl;
        const imageRef = ref(firebaseStorage, `boardPhoto/${file.name}`); // storage directory (path, file name)
        if (!file) return;
        await uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                imgUrl = url;
                showImage(imgUrl, "alt_text"); //에디터에 이미지 추가
            });
        });
    };

    useEffect(() => {
        if (!router.isReady) return;

        // get board id from url
        if (queries !== undefined) setBoardId(queries.toString());

        // get board type form url
        setBoardType(window.location.hash.split("#")[1].toString());
    }, [queries]);

    useEffect(() => {
        if (userInfo?.email == "" || loginStatus == false) {
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

    // if you press enter, add tag func
    const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log("enter");
        // enter code
        if (e.keyCode == 13) {
            setTags([...tags, tag]);
            setTag("");
        }
    };

    const onChangeContent = () => {
        setContent(contentRef.current?.getInstance().getHTML() ?? "");
    };

    const submitContent = async () => {
        if (content != "" && title != "") {
            // update func
            const userDoc = doc(firebaseDb, boardType, boardId);
            const newField = {
                title: title,
                content: content,
                tag: tags,
            };

            await updateDoc(userDoc, newField);
            router.push(`/board/${boardType}=${boardId}`);
        } else {
            alert("Please enter a title or content");
        }
    };

    return (
        <Edit.Wrapper>
            {/* title input (no comment input) */}
            <CommentInput
                style={{
                    width: "100%",
                    marginBottom: "20px",
                }}
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
                initialValue="typing content here!"
                previewStyle="vertical"
                height="100%"
                initialEditType="markdown"
                useCommandShortcut={false}
                hideModeSwitch={true}
                plugins={[
                    [codeSyntaxHighlight, { highlighter: Prism }],
                    colorSyntax,
                ]}
            />
            {/* tag input (no comment input) */}
            <Edit.BottomWrapper>
                <CommentInput
                    style={{
                        width: "50%",
                        marginTop: "20px",
                    }}
                    placeholder="tag (typing and press enter)"
                    onChange={(e) => {
                        setTag(e.target.value);
                    }}
                    onKeyDown={addTag}
                    value={tag}
                />
                <Edit.tagWrapper>
                    {/* show tags */}
                    {tags?.map((el, index) => (
                        <div key={index}>
                            <Edit.tag key={index}>
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
                            </Edit.tag>
                        </div>
                    ))}
                </Edit.tagWrapper>
            </Edit.BottomWrapper>
            <Edit.BtnWrapper>
                <Btn
                    onClick={submitContent}
                    style={{
                        width: "10%",
                        marginRight: "10px",
                    }}
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
            </Edit.BtnWrapper>
        </Edit.Wrapper>
    );
}
