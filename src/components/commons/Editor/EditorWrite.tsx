import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { useEffect, useRef } from "react";
import { type EditorOptions } from "@/types/interfaces/common";
import { HookCallback } from "@toast-ui/editor/types/editor";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "firebase.config";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import styled from "@emotion/styled";

export default function EditorWrite(options: EditorOptions) {
    const {
        height = "400px",
        type,
        initialValue = " ",
        onChange,
        imgUploadUrl,
    } = options;
    const contentRef = useRef<Editor>(null);

    // img upload func
    const addImage = async (file: File, showImage: HookCallback) => {
        console.log(file); //이미지 압축 및 서버 업로드 로직 실행
        let imgUrl;
        const imageRef = ref(firebaseStorage, `${imgUploadUrl}/${file.name}`); // storage directory (path, file name)
        if (!file) return;
        await uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                imgUrl = url;
                showImage(imgUrl, "alt_text"); //에디터에 이미지 추가
            });
        });
    };

    // img upload hook (기존 훅 제거 후, 같은 이름의 커스텀한 훅을 추가 [기존의(BASE64) 이미지 업로드 로직 변경])
    useEffect(() => {
        const editorInstance = contentRef.current?.getInstance();
        editorInstance?.removeHook("addImageBlobHook"); // <- 훅 제거
        editorInstance?.addHook("addImageBlobHook", addImage);
    }, []);

    return (
        <StyledEditor>
            <Editor
                ref={contentRef}
                onChange={() => {
                    onChange(type, contentRef);
                }}
                initialValue={initialValue}
                previewStyle="vertical"
                height={height}
                initialEditType="markdown"
                useCommandShortcut={false}
                hideModeSwitch={true}
                // plugins={[
                //     [codeSyntaxHighlightPlugin, { highlighter: Prism }],
                //     colorSyntax,
                // ]}
            />
        </StyledEditor>
    );
}

const StyledEditor = styled.section`
    margin-bottom: 20px;
    width: 100%;
`;
