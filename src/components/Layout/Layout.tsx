import { ReactNode } from "react";
import Footer from "@/components/Layout/Footer/Footer";
import Header from "@/components/Layout/Header/Header";
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

import Head from "next/head";

export default function Layout(props: { children: ReactNode }) {
    const { children } = props;

    const [, setLoginStatus] = useRecoilState(loginState);
    const [, setUserInfo] = useRecoilState(userInfoState);
    const [currentPath, setCurrentPath] = useState("");
    const router = useRouter();

    const footerBlockPath = ["/visit", "/experiment/one+page+library"]; // 푸터를 없애고 싶은 페이지의 path를 배열에 넣는다.
    const [footerFlag, setFooterFlag] = useState(true);

    const [specialFlag, setSpecialFlag] = useState(false); // 헤더또는 푸터에 특별한 스타일을 적용

    useEffect(() => {
        // login check func
        const loginCheck = () => {
            onAuthStateChanged(firebaseAuth, (user) => {
                if (user) {
                    setLoginStatus(true);
                    setUserInfo(user);
                } else {
                    setLoginStatus(false);
                    setUserInfo("");
                }
            });
        };

        if (firebaseAuth) loginCheck();
    }, [firebaseAuth]);

    // special header, footer
    useEffect(() => {
        if (currentPath) {
            if (currentPath === "/") {
                // special style..
                setSpecialFlag(true);
            } else {
                // common style..
                setSpecialFlag(false);
            }
        }
    });

    useEffect(() => {
        if (!router.isReady) return;
        setCurrentPath(router.pathname);
        if (footerBlockPath.includes(router.pathname)) {
            setFooterFlag(false);
        } else {
            setFooterFlag(true);
        }
    });

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, user-scalable=no"
                />
                <meta
                    name="description"
                    content="주니어 프론트엔드 개발자 조준영의 이력서, 포폴 및 블로그 사이트"
                />
                <meta property="og:title" content="Aimzero" />
                <meta
                    property="og:description"
                    content="주니어 프론트엔드 개발자 조준영의 이력서, 포폴 및 블로그 사이트"
                />
                <meta property="og:image" content="/images/Logo.png" />
                <meta
                    property="og:url"
                    content="https://aimzero-web.vercel.app/"
                />
                <title>Aimzero</title>
            </Head>
            <StyledLayout>
                <Header specialFlag={specialFlag} />
                <Content>{children}</Content>
                {footerFlag == true ? (
                    <Footer specialFlag={specialFlag} />
                ) : null}
            </StyledLayout>
        </>
    );
}

// dark theme
const StyledLayout = styled.section``;

const Content = styled.section`
    background-color: white;
    display: flex;
    justify-content: center;

    margin-top: 80px;
    @media (max-width: 1100px) {
        margin-top: 64px;
    }
`;
