import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRecoilState } from "recoil";
import { firebaseAuth } from "../../../../firebase.config";
import { loginState } from "../../../common/Recoil/loginState";
import { darkModeState } from "@/common/Recoil/darkModeState";
import { useOutSideRef, useScrollDirection } from "@/hooks/commons";
import Head from "next/head";

export default function PageHeader(props: { currentPath: string }) {
    const { currentPath } = props;
    const [specialFlag, setSpecialFlag] = useState(false); // 헤더의 특별한 스타일을 적용

    const [darkMode] = useRecoilState(darkModeState);
    const [loginStatus] = useRecoilState(loginState);

    const headerList = ["resume", "project", "blog", "photo", "visit log"];
    const router = useRouter();
    const crrUrl = router.pathname;
    // mobile
    const [menuFlag, setMenuFlag] = useState(true);
    const dropdownRef = useRef(null);
    useOutSideRef(dropdownRef, setMenuFlag);

    // header scroll visible
    const [headerShow, setHeaderShow] = useState(true);
    // test
    const [headerMargin, setHeaderMargin] = useState(0);

    // mobile menuFlag func
    const onClickMenu = () => {
        setMenuFlag(!menuFlag);
    };

    // logOut func
    const logOut = async () => {
        try {
            await firebaseAuth.signOut();
            setMenuFlag(true);
            location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (currentPath) {
            if (currentPath === "/") {
                // special header style..
                setSpecialFlag(true);
            } else {
                // common header style..
                setSpecialFlag(false);
            }
        }
    });

    useScrollDirection(
        () => {
            setHeaderMargin(-130);
        },
        () => {
            setHeaderMargin(0);
        }
    );

    return (
        <>
            {/* {headerShow && ( */}
            <>
                <Head>
                    <style>
                        {`
                        body {
                            background: ${specialFlag && "rgb(28, 5, 34)"};
                            background: ${darkMode && "#18181b"};
                        }
                    `}
                    </style>
                </Head>
                <Wrapper specialFlag={specialFlag} marginTop={headerMargin}>
                    {/* pc heder */}
                    <Menu>
                        {/* resume */}
                        <List
                            currentUrl={crrUrl === "/resume"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                        >
                            <Link href="/resume">{headerList[0]}</Link>
                            <div></div>
                        </List>
                        {/* skills */}
                        <List
                            currentUrl={crrUrl === "/project"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                        >
                            <Link href="/project">{headerList[1]}</Link>
                            <div></div>
                        </List>
                        {/* project */}
                        <List
                            currentUrl={crrUrl === "/blog"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                        >
                            <Link href="/blog">{headerList[2]}</Link>
                            <div></div>
                        </List>
                        {/* home */}
                        <Logo specialFlag={specialFlag}>
                            <Link href={"/"}>AimZero</Link>
                        </Logo>
                        {/* photo */}
                        <List
                            currentUrl={crrUrl === "/photo"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                        >
                            <Link href="/photo">
                                {headerList[3]}
                                <div></div>
                            </Link>
                        </List>
                        {/* visit log */}
                        <List
                            currentUrl={crrUrl === "/visit+log"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                        >
                            <Link href="/visit+log">{headerList[4]}</Link>
                            <div></div>
                        </List>
                        {/* login */}
                        <List
                            currentUrl={crrUrl === "/login"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                        >
                            {loginStatus == false ? (
                                <Link href="/login">
                                    login_<div></div>
                                </Link>
                            ) : (
                                // logout
                                <Link href={""} onClick={logOut}>
                                    logout<div></div>
                                </Link>
                            )}
                        </List>
                    </Menu>

                    {/* mobile header */}
                    <MobileMenu specialFlag={specialFlag}>
                        {/* hamburger menu icon */}

                        <RxHamburgerMenu
                            color={specialFlag ? "white" : ""}
                            fontSize={25}
                            style={{
                                marginLeft: "10px",
                                cursor: "pointer",
                            }}
                            onClick={(event) => {
                                onClickMenu();
                                event.stopPropagation();
                            }}
                        />

                        <Logo specialFlag={specialFlag}>
                            <Link
                                href={"/"}
                                onClick={() => {
                                    setMenuFlag(true);
                                }}
                            >
                                AimZero
                            </Link>
                        </Logo>
                        {/* login */}
                        <List
                            currentUrl={crrUrl === "/login"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                            style={{ marginRight: "10px" }}
                        >
                            {loginStatus == false ? (
                                <Link
                                    href="/login"
                                    onClick={() => {
                                        setMenuFlag(true);
                                    }}
                                >
                                    login_<div></div>
                                </Link>
                            ) : (
                                // logout
                                <Link href={""} onClick={logOut}>
                                    logout<div></div>
                                </Link>
                            )}
                        </List>
                    </MobileMenu>
                    <DropDown
                        menuFlag={menuFlag}
                        isDark={darkMode}
                        ref={dropdownRef}
                        specialFlag={specialFlag}
                    >
                        {/* resume */}
                        <List
                            currentUrl={crrUrl === "/resume"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                        >
                            <Link
                                href="/resume"
                                onClick={() => {
                                    setMenuFlag(true);
                                }}
                            >
                                {headerList[0]}
                            </Link>
                            <div></div>
                        </List>
                        {/* skills */}
                        <List
                            currentUrl={crrUrl === "/project"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                        >
                            <Link
                                href="/project"
                                onClick={() => {
                                    setMenuFlag(true);
                                }}
                            >
                                {headerList[1]}
                            </Link>
                            <div></div>
                        </List>
                        {/* project */}
                        <List
                            currentUrl={crrUrl === "/blog"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                        >
                            <Link
                                href="/blog"
                                onClick={() => {
                                    setMenuFlag(true);
                                }}
                            >
                                {headerList[2]}
                            </Link>
                            <div></div>
                        </List>
                        {/* photo */}
                        <List
                            currentUrl={crrUrl === "/photo"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                        >
                            <Link
                                href="/photo"
                                onClick={() => {
                                    setMenuFlag(true);
                                }}
                            >
                                {headerList[3]}
                                <div></div>
                            </Link>
                        </List>
                        {/* visit log */}
                        <List
                            currentUrl={crrUrl === "/visit+log"}
                            isDark={darkMode}
                            specialFlag={specialFlag}
                        >
                            <Link
                                href="/visit+log"
                                onClick={() => {
                                    setMenuFlag(true);
                                }}
                            >
                                {headerList[4]}
                            </Link>
                            <div></div>
                        </List>
                    </DropDown>
                </Wrapper>
            </>
            {/* )} */}
        </>
    );
}

const Wrapper = styled.section<{ specialFlag: boolean; marginTop: number }>`
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 130px;
    background-color: white;

    ${(props) =>
        props.specialFlag ? "background-color: rgb(28, 5, 34);" : null};

    margin-top: ${(props) => props.marginTop}px;

    transition: all 0.3s ease;

    @media (max-width: 1100px) {
        flex-direction: column;
        height: auto;
    }

    z-index: 1000;
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    max-width: 1200px;
    width: 100%;

    @media (max-width: 1100px) {
        display: none;
    }
`;

const MobileMenu = styled.div<{ specialFlag: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    max-width: 1200px;
    width: 100%;

    display: none;
    background-color: white;
    ${(props) =>
        props.specialFlag ? "background-color: rgb(28, 5, 34);" : null};
    z-index: 12;

    @media (max-width: 1100px) {
        display: block;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const DropDown = styled.div<{
    menuFlag: boolean;
    isDark: boolean;
    specialFlag: boolean;
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 400px;
    position: absolute;
    transition: all 0.3s;
    top: ${(props: any) => (props.menuFlag == true ? "-500px" : "53.5px")};
    z-index: 11;
    background-color: white;
    ${(props) =>
        props.specialFlag ? "background-color: rgb(28, 5, 34);" : null};
    ${(props) =>
        !props.isDark
            ? "box-shadow: 0 4px 4px -4px black"
            : "box-shadow: 0 4px 4px -4px lightgray"};
`;

const Logo = styled.div<{ specialFlag: boolean }>`
    font-family: Pacifico;
    font-weight: 200;
    font-size: 30px;
    color: black;
    color: ${(props) => (props.specialFlag ? "white" : null)};

    padding-bottom: 5px;

    cursor: pointer;

    @media (max-width: 1100px) {
        font-size: 25px;
        margin-left: 45px;
        margin-top: 5px;
    }
`;

const List = styled.div<{
    currentUrl: boolean;
    isDark: boolean;
    specialFlag: boolean;
}>`
    font-family: Garamond;
    font-weight: 400;
    font-size: 25px;
    color: black;
    color: ${(props) => (props.specialFlag ? "white" : null)};

    padding-bottom: 3px;
    cursor: pointer;

    div {
        width: ${(props) => (props.currentUrl ? "100%" : "0%")};
        height: 1px;
        ${(props) =>
            !props.isDark
                ? `border-bottom: 1px solid ${
                      props.currentUrl ? "black" : "white"
                  };`
                : `border-bottom: 1px solid ${
                      props.currentUrl ? "white" : "black"
                  };`}
        transition: all 0.3s;
    }

    :hover {
        div {
            width: 100%;
            ${(props) =>
                !props.isDark
                    ? "border-bottom: 1px solid black"
                    : "border-bottom: 1px solid white"}
        }
    }

    @media (max-width: 1100px) {
        margin-top: 5px;
        font-size: 22px;
    }
`;
