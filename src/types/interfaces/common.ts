import { DocumentData } from "firebase/firestore";
import { RefObject, SetStateAction } from "react";

// Editor-write
export interface EditorOptions {
    height?: string;
    type: "html" | "markdown";
    initialValue?: string;
    onChange: (type: string, ref: any) => void;
    imgUploadUrl: string;
}

// Tag
export interface TagOptions {
    tags: string[];
    setTags: React.Dispatch<SetStateAction<string[]>>;
}

// components -> Login
export interface LoginTypes {
    setId: React.Dispatch<SetStateAction<string>>;
    setPass: React.Dispatch<SetStateAction<string>>;
    login: () => void;
    loginGoogle: () => void;
}

// Pagination
export interface PageType {
    listLength: number;
    limit: number;
    page: number;
    setPage: Function;
}

// Photo
export interface PhotoType {
    userInfo: any;
    uploadStep: number;
    selectFile: (file: File) => void;
    fileInput: RefObject<HTMLInputElement>;
    uploadImgUrl: () => void;
    image: string;
    images: DocumentData[];
    isLoading: boolean;
    isMoreLoading: boolean;
    dataPresent: string;
    deletePhoto: (id: string) => void;
}

// SignUp
export interface SignUpType {
    goToSignUp: () => void;
    setId: React.Dispatch<SetStateAction<string>>;
    setPass: React.Dispatch<SetStateAction<string>>;
    setRePass: React.Dispatch<SetStateAction<string>>;
}
