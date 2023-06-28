import { loginState } from "@/common/Recoil/loginState";
import { userInfoState } from "@/common/Recoil/userInfoState";
import { Editor } from "@toast-ui/react-editor";
import { RefObject, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

export const useEditor = (initialValue: string) => {
    const [editorContent, setEditorContent] = useState(initialValue);

    const onChangeEditorContent = (
        type: string,
        contentRef: RefObject<Editor>
    ) => {
        if (type === "html") {
            setEditorContent(contentRef.current?.getInstance().getHTML() ?? "");
        }

        if (type === "markdown") {
            setEditorContent(
                contentRef.current?.getInstance().getMarkdown() ?? ""
            );
        }
    };

    return [editorContent, onChangeEditorContent] as const;
};

export const useBoardWriter = (writer: string) => {
    const [loginStatus] = useRecoilState(loginState);
    const [userInfo] = useRecoilState(userInfoState);

    if (writer === userInfo?.email.split("@")[0] && loginStatus === true) {
        return true;
    } else {
        return false;
    }
};

// useEffect first rendering block
export const useDidMountEffect = (func: () => void, deps: any) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
};

export const useAuth = () => {
    const [loginStatus] = useRecoilState(loginState);
    const [userInfo] = useRecoilState(userInfoState);

    if (loginStatus === true && userInfo.email === "aimzero9303@gmail.com") {
        return true;
    } else {
        return false;
    }
};
