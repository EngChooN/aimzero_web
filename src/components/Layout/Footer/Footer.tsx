import { darkModeState } from "@/common/Recoil/darkModeState";
import DarkModeSwitch from "@/components/commons/DarkModeSwitch/DarkModeSwitch";
import styled from "@emotion/styled";
import Link from "next/link";
import { FaBlogger, FaGithub, FaDiscord } from "react-icons/fa";
import { useRecoilState } from "recoil";

export default function PageFooter() {
    const [darkMode] = useRecoilState(darkModeState);
    return (
        <Wrapper isDark={darkMode}>
            <ContentsWrapper>
                <Logo>
                    <Link href="/">AimZero</Link>
                </Logo>
                <IconWrapper>
                    <FaBlogger
                        style={{ fontSize: "22px", cursor: "pointer" }}
                    />
                    <FaGithub style={{ fontSize: "22px", cursor: "pointer" }} />
                    <FaDiscord
                        style={{ fontSize: "22px", cursor: "pointer" }}
                    />
                </IconWrapper>
                <Desc>Copyright(c)2023 by Joonyoung Cho</Desc>
                <DarkModeSwitch />
            </ContentsWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.section<{ isDark: boolean }>`
    width: 100%;
    height: 170px;
    border-top: ${(props) => (!props.isDark ? "" : "1px solid grey")};
    background-color: #ededed;
    color: black;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ContentsWrapper = styled.div`
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const IconWrapper = styled.div`
    max-width: 200px;
    width: 100%;
    margin-bottom: 10px;

    display: flex;
    justify-content: space-evenly;
`;

const Desc = styled.span`
    font-family: Garamond;
`;

const Logo = styled.div`
    font-family: Pacifico;
    font-weight: 200;
    font-size: 30px;
    color: black;

    cursor: pointer;
`;
