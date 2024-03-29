import { SetStateAction, useEffect, useRef } from "react";
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
import { Query, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { HookCallback } from "@toast-ui/editor/types/editor";
import { firebaseDb, firebaseStorage } from "firebase.config";

export default function ReplyEdit(props: {
    commentId: string;
    setContent: React.Dispatch<SetStateAction<string>>;
}): JSX.Element {
    const { commentId, setContent } = props;
    const contentRef = useRef<Editor>(null);

    // fetch comment detail data func
    async function fetchBoardDetail(condition: Query<any>) {
        const querySnapshot = await getDocs(condition);
        querySnapshot.forEach((doc: any) => {
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

    useEffect(() => {
        const condition = query(
            collection(firebaseDb, "comment"),
            where("commentId", "==", commentId)
        );
        fetchBoardDetail(condition);
    }, []);

    const onChangeContent = () => {
        setContent(contentRef.current?.getInstance().getHTML() ?? "");
    };

    return (
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
    );
}
