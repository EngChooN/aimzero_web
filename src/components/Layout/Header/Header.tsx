import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRecoilState } from "recoil";
import { firebaseAuth } from "../../../../firebase.config";
import { loginState } from "../../../common/Recoil/loginState";
import { darkModeState } from "@/common/Recoil/darkModeState";

export default function PageHeader() {
    const [darkMode] = useRecoilState(darkModeState);
    const [loginStatus] = useRecoilState(loginState);

    const headerList = ["about", "skills", "project", "photo", "visit log"];
    const router = useRouter();
    const crrUrl = router.pathname;
    // mobile
    const [menuFlag, setMenuFlag] = useState(true);

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
            console.log(err);
        }
    };

    return (
        <Wrapper>
            {/* pc heder */}
            <Menu>
                {/* about */}
                <List currentUrl={crrUrl === "/about"} isDark={darkMode}>
                    <Link href="/about">{headerList[0]}</Link>
                    <div></div>
                </List>
                {/* skills */}
                <List currentUrl={crrUrl === "/skills"} isDark={darkMode}>
                    <Link href="/skills">{headerList[1]}</Link>
                    <div></div>
                </List>
                {/* project */}
                <List currentUrl={crrUrl === "/project"} isDark={darkMode}>
                    <Link href="/project">{headerList[2]}</Link>
                    <div></div>
                </List>
                {/* home */}
                <Logo>
                    <Link href={"/"}>AimZero</Link>
                </Logo>
                {/* photo */}
                <List currentUrl={crrUrl === "/photo"} isDark={darkMode}>
                    <Link href="/photo">
                        {headerList[3]}
                        <div></div>
                    </Link>
                </List>
                {/* visit log */}
                <List currentUrl={crrUrl === "/visit+log"} isDark={darkMode}>
                    <Link href="/visit+log">{headerList[4]}</Link>
                    <div></div>
                </List>
                {/* login */}
                <List currentUrl={crrUrl === "/login"} isDark={darkMode}>
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
            <MobileMenu>
                {/* hamburger menu icon */}

                <RxHamburgerMenu
                    fontSize={25}
                    onClick={onClickMenu}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                />

                <Logo>
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
            <DropDown menuFlag={menuFlag} isDark={darkMode}>
                {/* about */}
                <List currentUrl={crrUrl === "/about"} isDark={darkMode}>
                    <Link
                        href="/about"
                        onClick={() => {
                            setMenuFlag(true);
                        }}
                    >
                        {headerList[0]}
                    </Link>
                    <div></div>
                </List>
                {/* skills */}
                <List currentUrl={crrUrl === "/skills"} isDark={darkMode}>
                    <Link
                        href="/skills"
                        onClick={() => {
                            setMenuFlag(true);
                        }}
                    >
                        {headerList[1]}
                    </Link>
                    <div></div>
                </List>
                {/* project */}
                <List currentUrl={crrUrl === "/project"} isDark={darkMode}>
                    <Link
                        href="/project"
                        onClick={() => {
                            setMenuFlag(true);
                        }}
                    >
                        {headerList[2]}
                    </Link>
                    <div></div>
                </List>
                {/* photo */}
                <List currentUrl={crrUrl === "/photo"} isDark={darkMode}>
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
                <List currentUrl={crrUrl === "/visit+log"} isDark={darkMode}>
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
    );
}

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 130px;
    background-color: white;

    @media (max-width: 1100px) {
        flex-direction: column;
        height: auto;
    }
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

const MobileMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    max-width: 1200px;
    width: 100%;

    display: none;
    background-color: white;
    z-index: 12;

    @media (max-width: 1100px) {
        display: block;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const DropDown = styled.div<{ menuFlag: boolean; isDark: boolean }>`
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
        !props.isDark
            ? "box-shadow: 0 4px 4px -4px black"
            : "box-shadow: 0 4px 4px -4px lightgray"};
`;

const Logo = styled.div`
    font-family: Pacifico;
    font-weight: 200;
    font-size: 30px;
    color: black;

    padding-bottom: 5px;

    cursor: pointer;

    @media (max-width: 1100px) {
        font-size: 25px;
        margin-left: 45px;
        margin-top: 5px;
    }
`;

const List = styled.div<{ currentUrl: boolean; isDark: boolean }>`
    font-family: Garamond;
    font-weight: 400;
    font-size: 25px;
    color: black;

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
