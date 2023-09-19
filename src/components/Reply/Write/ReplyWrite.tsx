import { SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
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
import { DocumentData, doc, setDoc } from "firebase/firestore";
import { firebaseDb, firebaseStorage } from "../../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../common/Recoil/userInfoState";
import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { HookCallback } from "@toast-ui/editor/types/editor";
import emailjs from "emailjs-com";
import Button from "@/components/commons/Button/Button";

export default function ReplyWrite(props: {
    boardData: DocumentData;
    setCommentsData: React.Dispatch<SetStateAction<DocumentData[]>>;
    fetchComments: () => void;
}): JSX.Element {
    const { boardData, setCommentsData, fetchComments } = props;

    const contentRef = useRef<Editor>(null);
    const router = useRouter();
    const [content, setContent] = useState("");

    const [userInfo] = useRecoilState(userInfoState);
    const name = userInfo?.email.split("@")[0];

    // img upload hook
    useEffect(() => {
        const editorIns = contentRef.current?.getInstance();
        editorIns?.removeHook("addImageBlobHook"); //<- 제거
        editorIns?.addHook("addImageBlobHook", addImage); //<- 추가 },
    }, []);
    // img upload func
    const addImage = async (file: File, showImage: HookCallback) => {
        //이미지 압축 및 서버 업로드 로직 실행
        let imgUrl;
        const imageRef = ref(firebaseStorage, `replyPhoto/${file.name}`); // storage directory (path, file name)
        if (!file) return;
        await uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                imgUrl = url;
                showImage(imgUrl, "alt_text"); //에디터에 이미지 추가
            });
        });
    };

    // input on change content value
    const onChangeContent = () => {
        setContent(contentRef.current?.getInstance().getHTML() ?? "");
    };

    // create comment func
    const submitComment = async () => {
        let commentId = uuidv4();
        if (content != "") {
            try {
                await setDoc(doc(firebaseDb, "comment", commentId), {
                    id: boardData.id,
                    commentId: commentId,
                    email: userInfo.email,
                    name: name,
                    content: content,
                    timestamp: new Date(),
                });

                if (boardData.email !== userInfo.email) {
                    await sendEmail();
                } else {
                    // router.reload();
                    setCommentsData([]);
                    fetchComments();
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Please enter a title or content");
        }
    };

    const sendEmail = async () => {
        const templateParams = {
            board_writer: boardData.email,
            board_title: boardData.title,
            comment_writer: name,
            comment: content.replace(/<\/?[^>]+(>|$)/g, ""),
            board_url: document.location.href,
        };

        emailjs
            .send(
                "service_v3rhrfx",
                "template_wzkj3wc",
                templateParams,
                "Gs-3owh7O5wBJ3qkR"
            )
            .then(() => {
                alert("이메일전송됨");
                router.reload();
            })
            .catch((error) => {
                console.error("댓글 알림 이메일 전송 실패:", error);
            });
    };

    return (
        <>
            <Editor
                ref={contentRef}
                onChange={onChangeContent}
                initialValue="typing comment here!"
                previewStyle="tab"
                height="200px"
                initialEditType="markdown"
                useCommandShortcut={false}
                hideModeSwitch={true}
                autofocus={false}
                plugins={[
                    [codeSyntaxHighlight, { highlighter: Prism }],
                    colorSyntax,
                ]}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    label="submit"
                    primary={false}
                    backgroundColor="black"
                    onClick={submitComment}
                />
            </div>
        </>
    );
}
