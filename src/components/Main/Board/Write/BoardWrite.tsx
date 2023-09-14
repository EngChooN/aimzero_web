// import * as Write from "./BoardWrite.styles";
// import { useEffect, useRef, useState } from "react";
// import { CommentInput } from "../../../VisitLog/VisitLog.styles";
// import { Btn } from "../../../Login/Login.styles";
// // toast editor
// import { Editor } from "@toast-ui/react-editor";
// import "@toast-ui/editor/dist/toastui-editor.css";
// // toast plugin (code highlight)
// import Prism from "prismjs";
// import "prismjs/themes/prism.css";
// import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
// import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
// // toast plugin color pick
// import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
// import "tui-color-picker/dist/tui-color-picker.css";
// import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
// // firebase
// import { doc, setDoc } from "firebase/firestore";
// import { firebaseDb, firebaseStorage } from "../../../../../firebase.config";
// // recoil
// import { useRecoilState } from "recoil";
// import { userInfoState } from "../../../../common/Recoil/userInfoState";
// import { loginState } from "../../../../common/Recoil/loginState";
// import { useRouter } from "next/router";
// // uuid
// import { uuidv4 } from "@firebase/util";
// // icon
// import { MdCancel } from "react-icons/md";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { HookCallback } from "@toast-ui/editor/types/editor";
// import Tag from "@/components/commons/Tag/Tag";
// import Input from "@/components/commons/Input/Input";
// import EditorWrite from "@/components/commons/Editor/EditorWrite";
// import Button from "@/components/commons/Button/Button";
// import { useEditor } from "@/hooks/commons";
// import styled from "@emotion/styled";

// export default function BoardWrite(): JSX.Element {
//     const router = useRouter();

//     const [title, setTitle] = useState("");
//     const [editorContent, onChangeEditorContent] = useEditor("");

//     // tag list
//     const [tags, setTags] = useState<string[]>([]);

//     const [loginStatus] = useRecoilState(loginState);
//     const [userInfo] = useRecoilState(userInfoState);
//     const name = userInfo?.email.split("@")[0];
//     // url hash
//     let hash: string;
//     let boardId: string;

//     useEffect(() => {
//         // get url hash
//         // ex) #blog => blog
//         hash = window.location.hash.split("#")[1].toString();
//         boardId = uuidv4();
//         console.log("hash", hash);
//         if (userInfo?.email === null || loginStatus == false) {
//             router.push("/login");
//         }
//     });

//     const submitContent = async () => {
//         if (editorContent != "" && title != "") {
//             await setDoc(doc(firebaseDb, hash, boardId), {
//                 // not duplicate board id
//                 id: boardId,
//                 email: userInfo.email,
//                 name: name,
//                 title: title,
//                 tag: tags,
//                 content: editorContent,
//                 timestamp: new Date(),
//             });
//             router.push(`/board/${hash}=${boardId}`);
//         } else {
//             alert("Please enter a title or content");
//         }
//     };

//     return (
//         <StyledBoardWrite>
//             {/* test */}
//             <h1>Title</h1>
//             <Input
//                 placeholder={"type title!"}
//                 setValue={setTitle}
//                 value={title}
//             />
//             <h1>Content</h1>
//             {/* 삼항연산자를 사용하면 최초 렌더링 시,
//             contents가 undefined이기 때문에(내 예상임 그냥),
//             빈값인 작성하기 경우의 에디터로 렌더링 되는 문제가 있어 다음과 같이 함. */}
//             <EditorWrite
//                 type={"markdown"}
//                 onChange={onChangeEditorContent}
//                 imgUploadUrl={"projectPhoto"}
//                 initialValue={""}
//             />
//             <h1>Tag</h1>
//             <Tag tags={tags} setTags={setTags} />
//             <div>
//                 <Button
//                     label={"submit"}
//                     primary={false}
//                     backgroundColor={"black"}
//                     onClick={submitContent}
//                 />
//             </div>
//         </StyledBoardWrite>
//     );
// }

// const StyledBoardWrite = styled.section`
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;

//     padding: 10px;
//     margin-bottom: 60px;
//     max-width: 1200px;
//     width: 100%;

//     > h1 {
//         font-family: serif;
//         padding-left: 10px;
//         font-size: 18px;
//     }

//     > div {
//         width: 100%;
//         display: flex;
//         justify-content: flex-end;
//     }
// `;

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
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb, firebaseStorage } from "../../../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../common/Recoil/userInfoState";
import { loginState } from "../../../../common/Recoil/loginState";
import { useRouter } from "next/router";
// uuid
import { uuidv4 } from "@firebase/util";
// icon
import { MdCancel } from "react-icons/md";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { HookCallback } from "@toast-ui/editor/types/editor";

export default function BoardWrite(): JSX.Element {
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
    const name = userInfo?.email.split("@")[0];
    // url hash
    let hash: string;
    let boardId: string;

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
        // get url hash
        // ex) #blog => blog
        hash = window.location.hash.split("#")[1].toString();
        boardId = uuidv4();
        console.log("hash", hash);
        if (userInfo?.email === null || loginStatus == false) {
            router.push("/login");
        }
    });

    // if you press enter, add tag func
    const addTag = (e: React.KeyboardEvent) => {
        console.log("enter");
        // enter code
        if (e.keyCode == 13) {
            setTags([...tags, tag]);
            setTag("");
        }
    };

    const onChangeContent = () => {
        setContent(contentRef.current?.getInstance().getHTML() || "");
    };

    const submitContent = async () => {
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
                <Write.TagWrapper>
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
                </Write.TagWrapper>
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
