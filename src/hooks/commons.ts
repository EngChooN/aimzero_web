import { loginState } from "@/common/Recoil/loginState";
import { userInfoState } from "@/common/Recoil/userInfoState";
import { Editor } from "@toast-ui/react-editor";
import { firebaseDb } from "firebase.config";
import {
    DocumentData,
    collection,
    endAt,
    getDocs,
    orderBy,
    query,
    startAt,
} from "firebase/firestore";
import {
    MutableRefObject,
    RefObject,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRecoilState } from "recoil";
// lodash
import _ from "lodash";

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

    if (loginState && userInfo) {
        if (writer === userInfo?.email.split("@")[0] && loginStatus === true) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

// if you want (useEffect first rendering block)
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

export const useWindowWidth = (initialValue: number) => {
    const [windowWidth, setWindowWidth] = useState(initialValue);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    return [windowWidth];
};

export function useOutSideRef(
    ref: RefObject<HTMLElement>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(true);
            }
        }
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });

    return ref as MutableRefObject<HTMLElement | null>;
}

export const useBoardSearch = (menu: string) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResult, setSearchResult] = useState<DocumentData[]>([]);

    useEffect(() => {
        const searchBoardFunc = _.debounce(async () => {
            const q = query(
                collection(firebaseDb, menu), // 포스트 컬렉션
                orderBy("title"), // 제목 정렬
                startAt(searchKeyword),
                endAt(searchKeyword + "\uf8ff")
            );
            const resSnap = await getDocs(q);
            const searchData = resSnap.docs.map((doc) => doc.data());
            setSearchResult(searchData);
        }, 1000);
        searchBoardFunc();
    }, [searchKeyword]);

    return [searchKeyword, setSearchKeyword, searchResult] as const;
};
