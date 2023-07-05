import { ReactNode } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
// firebase
import { firebaseAuth } from "../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { loginState } from "../../common/Recoil/loginState";
import { userInfoState } from "../../common/Recoil/userInfoState";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { darkModeState } from "@/common/Recoil/darkModeState";
import FloatingButton from "./FloatingButton/FloatingButton";

export default function Layout(props: { children: ReactNode }) {
    const { children } = props;
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);

    const [, setLoginStatus] = useRecoilState(loginState);
    const [, setUserInfo] = useRecoilState(userInfoState);
    const router = useRouter();

    const footerBlockPath = ["/visit+log", "/photo"]; // 푸터를 없애고 싶은 페이지의 path를 배열에 넣는다.
    const [footerFlag, setFooterFlag] = useState(true);

    useEffect(() => {
        // login check func
        const loginCheck = () => {
            onAuthStateChanged(firebaseAuth, (user) => {
                if (user) {
                    setLoginStatus(true);
                    setUserInfo(user);
                    console.log(user);
                    console.log("check login OK!");
                } else {
                    setLoginStatus(false);
                    setUserInfo("");
                    console.log("check login NO!");
                }
            });
        };

        if (firebaseAuth) loginCheck();
    }, [firebaseAuth]);

    useEffect(() => {
        if (!router.isReady) return;
        console.log("path name", router.pathname);
        if (footerBlockPath.includes(router.pathname)) {
            console.log("No footer!");
            setFooterFlag(false);
        } else {
            console.log("Yes footer!");
            setFooterFlag(true);
        }
    });

    // theme light? dark? check local storage
    useEffect(() => {
        const localDarkMode = localStorage.getItem("dark");
        if (localDarkMode !== null) {
            setDarkMode(JSON.parse(localDarkMode));
        }
    }, []);

    return (
        <StyledLayout isDark={darkMode}>
            <Header />
            <Content>{children}</Content>
            {footerFlag == true ? <Footer /> : null}
            {/* <Feedback /> */}
            <FloatingButton />
        </StyledLayout>
    );
}

const StyledLayout = styled.section<{ isDark: boolean }>`
    ${(props) =>
        props.isDark &&
        `a,
    div,
    p,
    section,
    article,
    h1,
    h2,
    h3,
    span {
        color: lightgrey;
    }

    .ant-pagination .ant-pagination-item-active a {
        color: lightgrey;
    }
    .ant-pagination .ant-pagination-item-active {
        color: lightgrey;
    }

    .ant-pagination .ant-pagination-item-active:hover {
        color: lightgrey;
    }

    .ant-pagination .ant-pagination-item-active:hover a {
        color: lightgrey;
    }

    .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: lightgrey;
    }

    .ant-tabs .ant-tabs-tab {
        color: lightgrey;
    }

    .ant-tabs .ant-tabs-tab:hover {
        color: lightgrey;
    }

    .ant-tabs .ant-tabs-ink-bar {
        background: lightgrey;
    }

    div,
    section,
    article {
        background: #18181b;
    }

    input, textarea {
        background: black;
        color: white;
        border: 1px solid grey;
    }

    .toastui-editor-contents p{
        color: lightgrey;
    }
    .toastui-editor-contents h1{
        color: lightgrey;
    }
    .toastui-editor-contents h2{
        color: lightgrey;
    }
    .toastui-editor-contents h3{
        color: lightgrey;
    }
    .toastui-editor-contents h4{
        color: lightgrey;
    }
    
    .toastui-editor-defaultUI-toolbar button{
        border:none;
    }
    .toastui-editor-md-tab-container {
        background: #18181b;
    }

    .toastui-editor-defaultUI {
        border: 1px solid grey;
    }

    .toastui-editor-defaultUI-toolbar {
        border-bottom: 1px solid grey;
    }

    .toastui-editor-main .toastui-editor-md-splitter {
        background-color: grey;
    }

    .toastui-editor-defaultUI .toastui-editor-md-tab-container {
        background: #18181b;
    }

    .ant-empty-description{
        color: lightgrey;
    }

    button {
        border: 1px solid grey;
    }

    .ant-list .ant-list-item .ant-list-item-meta .ant-list-item-meta-title >a {
        color: lightgrey;
    }

    .ant-list .ant-list-item .ant-list-item-meta .ant-list-item-meta-description {
        color: grey;
    }

    .ant-pagination .ant-pagination-item {
        background-color: black;
        border: 1px solid lightgrey;
    }

    .ant-pagination .ant-pagination-item-active {
        background-color: grey;
        border: 1px solid lightgrey;
    }

    .ant-pagination .ant-pagination-item a {
        color: lightgrey;
    }`}
`;

const Content = styled.section`
    background-color: white;
    display: flex;
    justify-content: center;
`;
