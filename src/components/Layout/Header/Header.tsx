import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRecoilState } from "recoil";
import { firebaseAuth } from "../../../../firebase.config";
import { loginState } from "../../../common/Recoil/loginState";
import { useOutSideRef, useScrollDirection } from "@/hooks/commons";
import Head from "next/head";
import Button from "@/components/commons/Button/Button";

export default function PageHeader(props: { specialFlag: boolean }) {
    const { specialFlag } = props;
    const [loginStatus] = useRecoilState(loginState);

    const headerList = [
        { name: "resume", link: "/resume" },
        { name: "project", link: "/project?tag=all" },
        { name: "blog", link: "/blog" },
        { name: "photo", link: "/photo" },
        { name: "experiment", link: "/experiment" },
        { name: "board", link: "/board" },
        { name: "visit", link: "/visit" },
    ];
    const router = useRouter();
    const crrUrl = router.pathname;
    // mobile
    const [menuFlag, setMenuFlag] = useState(true);
    const dropdownRef = useRef(null);
    useOutSideRef(dropdownRef, setMenuFlag);

    // header scroll visible
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

    useScrollDirection(
        () => {
            if (window.scrollY <= 100) {
                setHeaderMargin(0);
            } else {
                setHeaderMargin(-130);
            }
        },
        () => {
            setHeaderMargin(0);
        }
    );

    return (
        <>
            <Head>
                <style>
                    {`
                        body {
                            background: ${specialFlag && "rgb(28, 5, 34)"};
                        }
                    `}
                </style>
            </Head>
            <Wrapper specialFlag={specialFlag} marginTop={headerMargin}>
                {/* pc heder */}
                <Menu>
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
                    {headerList.map((el, index) => (
                        <List
                            key={index}
                            currentUrl={crrUrl.includes(el.link)}
                            specialFlag={specialFlag}
                        >
                            <Link
                                href={el.link}
                                onClick={() => {
                                    setMenuFlag(true);
                                }}
                            >
                                {el.name}
                            </Link>
                            <div></div>
                        </List>
                    ))}
                    {loginStatus ? (
                        <Button
                            label="logout"
                            backgroundColor="black"
                            primary={false}
                            onClick={logOut}
                        />
                    ) : (
                        <Button
                            label="login"
                            backgroundColor="black"
                            primary={false}
                            onClick={() => {
                                router.push("/login");
                            }}
                        />
                    )}
                </Menu>

                {/* mobile header */}
                <MobileMenu specialFlag={specialFlag}>
                    {/* hamburger menu icon */}

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
                    <RxHamburgerMenu
                        color={specialFlag ? "white" : ""}
                        fontSize={25}
                        style={{
                            marginRight: "10px",
                            cursor: "pointer",
                        }}
                        onClick={(event) => {
                            onClickMenu();
                            event.stopPropagation();
                        }}
                    />
                </MobileMenu>
                <DropDown
                    menuFlag={menuFlag}
                    ref={dropdownRef}
                    specialFlag={specialFlag}
                >
                    {headerList.map((el, index) => (
                        <List
                            key={index}
                            currentUrl={crrUrl.includes(el.link)}
                            specialFlag={specialFlag}
                        >
                            <Link
                                href={el.link}
                                onClick={() => {
                                    setMenuFlag(true);
                                }}
                            >
                                {el.name}
                            </Link>
                            <div></div>
                        </List>
                    ))}
                    {loginStatus ? (
                        <Button
                            label="logout"
                            backgroundColor="black"
                            primary={false}
                            onClick={logOut}
                        />
                    ) : (
                        <Button
                            label="login"
                            backgroundColor="black"
                            primary={false}
                            onClick={() => {
                                router.push("/login");
                            }}
                        />
                    )}
                </DropDown>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section<{ specialFlag: boolean; marginTop: number }>`
    display: flex;
    flex-direction: column;

    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    /* height: 130px; */
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
    justify-content: space-between;

    max-width: 1200px;
    width: 100%;
    height: 80px;

    > button {
        margin: 0px;
    }

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
    height: 65px;

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
    specialFlag: boolean;
}>`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: space-around;
    width: 100%;
    height: fit-content;
    position: absolute;
    transition: all 0.3s;
    top: ${(props: any) => (props.menuFlag == true ? "-500px" : "53.5px")};
    z-index: 11;
    background-color: white;
    ${(props) =>
        props.specialFlag ? "background-color: rgb(28, 5, 34);" : null};
    box-shadow: 0 4px 4px -4px black;

    > button {
        margin: 10px;
        margin-top: 40px;
        margin-bottom: 20px;
    }

    @media (min-width: 1100px) {
        display: none;
        height: -500px;
    }
`;

const Logo = styled.div<{ specialFlag: boolean }>`
    font-family: Pacifico;
    font-weight: 200;
    font-size: 32px;
    color: black;
    color: ${(props) => (props.specialFlag ? "white" : null)};
    cursor: pointer;

    @media (max-width: 1100px) {
        margin-left: 10px;
    }
`;

const List = styled.div<{
    currentUrl: boolean;
    specialFlag: boolean;
}>`
    width: fit-content;
    font-family: Garamond;
    font-weight: 400;
    font-size: 23px;
    color: black;
    color: ${(props) => (props.specialFlag ? "white" : null)};

    padding-bottom: 3px;
    cursor: pointer;

    div {
        width: ${(props) => (props.currentUrl ? "100%" : "0%")};
        height: 1px;
        border-bottom: 1px solid
            ${(props) => (props.currentUrl ? "black" : "none")};

        transition: all 0.3s;
    }

    :hover {
        div {
            width: 100%;
            border-bottom: 1px solid black;
        }
    }

    @media (max-width: 1100px) {
        padding-left: 20px;
        margin-top: 30px;
    }
`;
